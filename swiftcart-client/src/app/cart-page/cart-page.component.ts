import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  products: Array<any> = [];
  userId!:string;
  cartItemsTotalPrice = 0;
  
  constructor(private cartService: CartService, private authService: AuthService,  private paymentService: PaymentService)  { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.fetchCartProducts();
  }

  fetchCartProducts() {
    this.cartService.getAllProductsInCart(this.userId)
    .subscribe((res:any)=>{
      this.products = res.items;
      this.cartItemsTotalPrice = 0;
      for(const product of this.products) {
        this.cartItemsTotalPrice += product.productId.price * product.quantity;
      }
      this.paymentService.cartItemsTotalPrice$.next(this.cartItemsTotalPrice + (this.cartItemsTotalPrice * 18)/100);
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

}

