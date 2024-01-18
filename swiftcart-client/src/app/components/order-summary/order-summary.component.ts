import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  orderId:any = '';
  displayName:string;
  orderData = {
    created: '',
    items: [],
    orderId: '',
    paymentStatus: 'pending',
    shippingAddress: '',
    amount: 0,
    userId: ''
  }
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.orderId = queryParams.get('orderId');
    this.orderService.getOrderDetails(this.orderId).subscribe((res: any)=>{
      if(res) {
        this.orderData.created = res.createdAt;
        this.orderData.items = res.items;
        this.orderData.orderId = res.orderId;
        this.orderData.paymentStatus = res.paymentStatus;
        this.orderData.shippingAddress = res.shippingAddress;
        this.orderData.amount = res.totalAmount;
        this.orderData.userId = res.user?._id;
        this.displayName = res.user?.name;
      }
      console.log('order api response', res);
    })
  }

  generateAndOpenPDF() {
    const pdf = new jsPDF();

    // Add content to the PDF using the fetched data
    pdf.text(this.formatter(), 10, 20);

    // Open the PDF in a new tab
    const pdfData = pdf.output();
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  formatter(){
    let res = `Hi ${this.displayName}, Your Order has been placed successfully\n\n\n\n`;
    
    for(let item of this.orderData.items){
      const product = item.product;

      for(let prop in product){
        if(['_id', '__v', 'isAvailable', 'image', 'productIdentifier', 'rating', 'description'].indexOf(prop)>-1) {
          continue;
        }
        if(prop === 'price') {
          res += (prop + ' : Rs. ' + product[prop] + '\n\n');
        } else {
          res += (prop + ' : ' + product[prop] + '\n\n');
        }
      }
      res += ("quantity" + ' : ' + item.quantity + '\n\n');
      res += ' ------------------------------------------------------- \n\n';

    }

    res += 'Total amount paid(including taxes) : Rs. ' + this.orderData.amount + '\n\n';

    res += 'Shipping Address  : ' + this.orderData.shippingAddress + '\n\n';


    res += '\n\nThank you for shopping with swiftcart.com!!!!\n\n'



    return res;
}

}
