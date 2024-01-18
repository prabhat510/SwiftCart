import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalUtil } from 'src/app/utils/global.util';
import { ICartItem } from '../../interfaces/cartitem.interface';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  userId :string;
  quantity = 1;
  globalUtil: GlobalUtil;
  @Input() cartItem: ICartItem;
  @Output() removeItemEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateCartEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cartService: CartService, private authService: AuthService) { 
    this.globalUtil = new GlobalUtil();
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.quantity = this.cartItem.quantity;
    console.log("cartItem::::", this.cartItem);
  }

  handleProductCount(action:string, productId: string) {
    if(action === 'added') {
      const productPayload = {productId: productId, quantity: 1 + this.quantity};
      this.cartService.updateCart(productPayload)
      .subscribe((res)=>{
        this.quantity += 1;
        this.updateCartEvent.emit({action: action, price: this.cartItem.product.price});
        console.log('count increased::', res);
      })
    } else if(action === "removed") {
      const productPayload = {productId: productId, quantity: this.quantity - 1};
      this.cartService.updateCart(productPayload)
      .subscribe((res)=>{
        this.quantity -= 1;
        this.updateCartEvent.emit({action: action, price: this.cartItem.product.price});
        console.log('count decreased::', res);
      })
    }
  }

  removeCartItem(productId: string) {
    const productPayload = {productId: productId};
    this.cartService.removeCartItem(productPayload)
    .subscribe((res: any)=> {
      console.log("res==....", res);
      this.removeItemEvent.emit();
    });
  }
}


/**
 * payment:: generate orderid:::use this orderId to create a new order::
 * if payment succeeds we can use this order Id to fetch the order and save payment record with orderId
 *  on the summary page and generate reciept
 */