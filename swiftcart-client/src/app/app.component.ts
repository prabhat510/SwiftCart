import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';
import {jsPDF} from 'jspdf';
import { IProduct } from './interfaces/product.interface';
import { getServiceUrl } from './utils/api.config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user:any;
  products: Array<IProduct> = [];
  limit = 10;
  offset = 0;
  totalProducts = 0;
  filterTerm: string = '';
  orderId: string;
  orderData: any;

  cartProducts: Array<any> = [];
  userId:string;
  cartItemsTotalPrice = 0;
  totalAmountWithTax = 0;
  totalCartItems = 0;
  enableDownload = false;
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService, 
    private orderService: OrderService,
    ) { }

  ngOnInit() {

    this.userId = this.authService.getUserId();
    this.fetchDisplayProducts();
    this.fetchCartProducts();
    this.fetchOrderData();
  

    let decoded:any;
    const user = localStorage.getItem('user');
    if(user) {
      console.log("user::::", user);
      this.user = JSON.parse(user);
      decoded = jwtDecode(this.user.token);
    } else {
      this.getNewToken();
    }
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkTokenValidity(decoded);
      console.log(decoded);
    });
  }
  

  checkTokenValidity(decodedToken: any) {
    // time is in epoch
   if(decodedToken && decodedToken.exp) {
    const currentTime =  Math.floor(Date.now()/1000);
    const tokenExpiryTime = decodedToken.exp;
    console.log(currentTime, tokenExpiryTime);
    if(currentTime > tokenExpiryTime) {
      // get new token
      this.getNewToken();
    }
  } 
  }

  getNewToken() {
    console.log('getting new token...');
    this.authService.getNewToken().subscribe((res: any)=>{
      this.user.token = res.token;
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('got new token...', res.token);
    });
  }

  fetchOrderData() {
    console.log('fetchOrderData init');
    this.route.queryParams.subscribe((response: any)=>{
      console.log("responseeee",response);
      
      this.orderId = response['orderId'];
      if(this.orderId) {
        this.orderService.getOrderDetails(this.orderId).subscribe((res: any)=>{
          console.log('fetchOrderData res', res);
          this.orderData = res;
          this.enableDownload = true;
        })
      }
    });
  }


  fetchCartProducts() {
    this.cartService.getAllProductsInCart(this.userId)
    .subscribe((res:any)=>{
      console.log('getAllProductsInCart::', res);
      
      this.cartProducts = res.items;
      this.cartItemsTotalPrice = 0;
      for(const product of res.items) {
        this.cartItemsTotalPrice += product.productId.price * product.quantity;
        this.totalCartItems += product.quantity;
      }
      this.totalAmountWithTax= this.cartItemsTotalPrice + (this.cartItemsTotalPrice * 18)/100;
    })
  }

  updateTotalPrice(event: any) {
    console.log('update event recieved', event);
    if(event.action === 'added') {
      this.cartItemsTotalPrice += event.price;
    } else if(event.action === 'removed') {
      this.cartItemsTotalPrice -= event.price;
    }
    this.orderService.cartItemsTotalPrice$.next(this.cartItemsTotalPrice + (this.cartItemsTotalPrice * 18)/100);
  }

  generateAndOpenPDF(data:any) {
    const pdf = new jsPDF();

    // Add content to the PDF using the fetched data
    pdf.text('PDF Content:', 10, 10);
    pdf.text(this.formatter(data), 10, 20);

    // Open the PDF in a new tab
    const pdfData = pdf.output();
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  formatter(orderedData: any){
    console.log("orderedData::==", orderedData)
    let res = 'Your Order has been placed successfully\n\n\n\n';
    
    for(let key in orderedData.items){
      const product = orderedData.items[key];

      for(let prop in product.productId){
        if(prop === 'price') {
          res += (prop + ' : Rs. ' + product.productId[prop] + '\n\n');
        } else if(prop === 'name'){
          res += (prop + ' : ' + product.productId[prop] + '\n\n');
        }
      }
      res += `quantity : ${product.quantity}\n\n`;
      res += ' ------------------------------------------------------- \n\n';

    }

    res += 'Total amount paid(including taxes) : Rs. ' + orderedData.totalAmount + '\n\n';

    res += 'Shipping Address  : ' + orderedData.shippingAddress + '\n\n';


    res += '\n\nThank you for shopping with swiftcart.com!!!!\n\n'



    return res;
  }

  addToCart(product: any) {
    if(this.userId) {
      const payload = {
        productId: product._id,
        quantity: 1
      };
      this.cartService.addProductToCart(payload, this.userId)
      .subscribe({
        next: (res)=>{
          console.log("response::", res);
          this.fetchCartProducts();
          this.fetchDisplayProducts();
        },
        error: (error)=>{
          console.log("error adding to cart::", error);
        }
      })
    } else {
      alert('cannot add item as userId is not present');
    }
  }

  setImageSrc() {
    for (let i = 0; i < this.products.length; i++) {
      this.products[i].image = getServiceUrl().swiftCartApiEndpoint + '/images/' + this.products[i].image;
    }
  }

  checkItemPresentInCart(product: any) {
  return new Promise((resolve, reject)=>{
    this.userId = this.authService.getUserId();
    const payload = {
      productId: product._id
    }
    this.cartService.checkItemAddedToCart(payload, this.userId)
    .subscribe((res:any)=>{
      if(res) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  })
  }

  fetchDisplayProducts() {
    const queryParams = {
      limit: this.limit,
      offset: this.offset
    };
    this.productService.getAllProducts(queryParams)
    .subscribe({
      next: async(res:any)=>{
        for (let i = 0; i < res.products.length; i++) {
          await this.checkItemPresentInCart(res.products[i]).then(promiseRes=>{
            if(promiseRes) {
              res.products[i].isItemAlreadyInCart = true;
            } else {
              res.products[i].isItemAlreadyInCart = false;
            }
          })
        }
        this.products = res.products;
        this.setImageSrc();
        this.totalProducts = res.totalCount;
        console.log('count', this.totalProducts, 'res', this.products);
      }
    })
  }
}
