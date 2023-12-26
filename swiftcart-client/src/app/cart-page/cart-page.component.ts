import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  products: Array<any> = [];
  userId!:string;
  cartItemsTotalPrice = 0;
  totalCartItems = 0;
  orderSummary: any = {
    userId: '',
    totalAmount: 0,
    items: [],
    shippingAddress: '',
    status: 'pending'
  }
  
  constructor(private cartService: CartService, private authService: AuthService,  private paymentService: PaymentService,
    private productService: ProductService)  { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.orderSummary.userId = this.userId;
    this.fetchCartProducts();
  }

  fetchCartProducts() {
    this.cartService.getAllProductsInCart(this.userId)
    .subscribe((res:any)=>{
      this.products = res.items;
      this.cartItemsTotalPrice = 0;
      for(const product of this.products) {
        this.orderSummary.items.push(
          {
            productId: product.productId._id, 
            productName: product.productId.name,
            quantity: product.quantity, 
            price: product.productId.price 
          })
        this.cartItemsTotalPrice += product.productId.price * product.quantity;
        this.totalCartItems += product.quantity;
      }
      this.orderSummary.totalAmount = this.cartItemsTotalPrice + (this.cartItemsTotalPrice * 18)/100;
      this.paymentService.cartItemsTotalPrice$.next(this.orderSummary.totalAmount);
      console.log('cart response', res, this.products);
    })
  }

  updateTotalPrice(event: any) {
    console.log('update event recieved', event);
    if(event.action === 'added') {
      this.cartItemsTotalPrice += event.price;
    } else if(event.action === 'removed') {
      this.cartItemsTotalPrice -= event.price;
    }
    this.paymentService.cartItemsTotalPrice$.next(this.cartItemsTotalPrice + (this.cartItemsTotalPrice * 18)/100);
  }
  onCheckout() {
    // localStorage.setItem("orderSummary", JSON.stringify(this.orderSummary));
    this.productService.orderSummary$.next(this.orderSummary);
  }

}

