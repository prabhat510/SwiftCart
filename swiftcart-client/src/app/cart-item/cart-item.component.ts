import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ICartItem } from '../interfaces/cartitem.interface'; 
import { getServiceUrl } from '../utils/api.config';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  userId :string;
  quantity = 1;
  @Input() cartItem: ICartItem;
  @Output() removeItemEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateCartEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cartService: CartService, private authService: AuthService) { 
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.quantity = this.cartItem.quantity;
  }

  handleProductCount(action:string, productId: string) {
    if(action === 'added') {
      const productPayload = {productId: productId, quantity: 1 + this.quantity};
      this.cartService.updateItemQuantity(productPayload, this.userId)
      .subscribe((res)=>{
        this.quantity += 1;
        this.updateCartEvent.emit({action: action, price: this.cartItem.productId.price});
        console.log('count increased::', res);
      })
    } else if(action === "removed") {
      const productPayload = {productId: productId, quantity: this.quantity - 1};
      this.cartService.updateItemQuantity(productPayload, this.userId)
      .subscribe((res)=>{
        this.quantity -= 1;
        this.updateCartEvent.emit({action: action, price: this.cartItem.productId.price});
        console.log('count decreased::', res);
      })
    }
  }

  removeCartItem(productId: string) {
    const productPayload = {productId: productId};
    this.cartService.removeCartItem(productPayload, this.userId)
    .subscribe((res: any)=> {
      console.log("res==....", res);
      this.removeItemEvent.emit();
    });
  }

  getImageSrc(imageId: string) {
    return getServiceUrl().swiftCartApiEndpoint + '/images/' + imageId + '?token=' + this.authService.getAccessToken();
  }
}
