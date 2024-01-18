import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  totalAmount = 0;
  orderId:string;
  options = {
    key: "rzp_test_Vsyn9DFkRneYcm", // Enter the Key ID generated from the Dashboard
    amount: "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "SwiftCart", //your business name
    description: "Test Transaction",
    image: "https://t4.ftcdn.net/jpg/02/66/71/71/360_F_266717164_J8Fqw4OcXRkKtNwFyHD02zIEsxPI7qHH.jpg",
    order_id: "order_NGH6adccXE1Bwv", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: "http://localhost:3000/api/payment/status",
    redirect: true,
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: "Prabhat Bhargav", //your customer's name
      email: "prabhat.bhargav.work@gmail.com",
      contact: "9009131739", //Provide the customer's phone number for better conversion rates
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  adressForm = {
    shipment:'',
    billing: ''
  }
  orderedItems: Array<any>;
  constructor(private orderService: OrderService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.fetchOrderData();
  }
  submitForm(form: NgForm) {
    
    if(form.status === "VALID") {
      this.generateOrderId()
      .then((res: any)=>{
        this.options.amount = `${this.totalAmount*100}`;
        this.options.order_id = res.id;
        this.setRazorPayScriptsInDOM();
        this.createOrder();
    }) 
    } else {
      alert('please fill all the fields properly');
    }
  }

  generateOrderId() {
    const payload = {
      "amount": this.totalAmount*100,
      "currency": "INR",
      "reciept": 'reciept_1'
    };
    return new Promise((resolve, reject)=>{
      this.orderService.createOrderId(payload)
      .subscribe((res: any)=>{
        this.orderId = res.id;
        resolve(res);
      })
    });
  }

  setRazorPayScriptsInDOM() {
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');
    const razorpayClientScript = 'var options = ' + JSON.stringify(this.options) + ';' 
    + ' var rzp1 = new Razorpay(options); rzp1.on("payment.success", ()=>{ location.href="http://localhost:4200" });'
    + "setTimeout(() => {rzp1.open();}, 500)";
    const scriptContent = document.createTextNode(razorpayClientScript);
    script.appendChild(scriptContent);
    body.appendChild(script);
  }

  fetchOrderData() {
    this.cartService.getAllProductsInCart()
    .subscribe((res: any)=>{
      console.log("response::", res);
      const items = res.data.items;
      this.orderedItems = items;
      items.forEach(item=> this.totalAmount = this.totalAmount + (item.product.price * item.quantity));
      this.totalAmount += (this.totalAmount * 18)/100;
    })
  }

  createOrder() {
    const orderPayload = {
      totalAmount: this.totalAmount,
      items: this.orderedItems,
      shippingAddress: this.adressForm.shipment,
      orderId: this.options.order_id
    }
    this.orderService.createOrder(orderPayload).subscribe((res)=>{
      console.log('order created::', res);
    });
  }
}

/**
 * 
 * user clicks make payment
 * dynamically insert the script tag in the index file with all the options data and other code
 * call rzp1.open(); to open the payment interface of razorpay
 * 
 */