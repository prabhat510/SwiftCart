import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  userId!:string;
  quantity = 1;
  @Input() product: any; 
  @Output() removeItemEvent = new EventEmitter<any>();
  @Output() updateCartEvent = new EventEmitter<any>();
  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.quantity = this.product.quantity;
  }

  handleProductCount(action:string, productId: string) {
    if(action === 'added') {
      const productPayload = {productId: productId, quantity: 1 + this.quantity};
      this.cartService.updateItemQuantity(productPayload, this.userId)
      .subscribe((res)=>{
        this.quantity += 1;
        this.updateCartEvent.emit({action: action, price: this.product.productId.price});
        console.log('count increased::', res);
      })
    } else if(action === "removed") {
      const productPayload = {productId: productId, quantity: this.quantity - 1};
      this.cartService.updateItemQuantity(productPayload, this.userId)
      .subscribe((res)=>{
        this.quantity -= 1;
        this.updateCartEvent.emit({action: action, price: this.product.productId.price});
        console.log('count decreased::', res);
      })
    }
  }

  removeCartItem(productId: string) {
    const productPayload = {productId: productId};
    this.cartService.removeCartItem(productPayload, this.userId)
    .subscribe((res: any)=> {
      this.removeItemEvent.emit();
    });
  }
}
