import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { IOrder } from '../../interfaces/order.interface';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  items: Array<any> = [];
  userId:string;
  cartItemsTotalPrice = 0;
  totalCartItems = 0;
  orderSummary: IOrder = {
    userId: '',
    totalAmount: 0,
    items: [],
    shippingAddress: '',
    status: 'pending'
  }
  
  constructor(private cartService: CartService,
    private authService: AuthService, 
    private orderService: OrderService,
    private productService: ProductService)  { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.orderSummary.userId = this.userId;
    this.fetchCartProducts();
  }

  fetchCartProducts() {
    this.cartService.getAllProductsInCart()
    .subscribe((res:any)=>{
      this.items = res.data?.items;
      this.cartItemsTotalPrice = 0;
      console.log("items:::", res);
      for(const item of this.items) {
        if(item && item.product) {
          this.orderSummary.items.push(
            {
              productId: item.product._id, 
              productName: item.product.name,
              quantity: item.quantity, 
              price: item.product.price 
            })
          this.cartItemsTotalPrice += item.product.price * item.quantity;
        }
        this.totalCartItems += item.quantity;
      }
      this.orderSummary.totalAmount = this.cartItemsTotalPrice + (this.cartItemsTotalPrice * 18)/100;
      console.log('cart response', res, this.items);
    })
  }

  updateTotalPrice(event: any) {
    console.log('update event recieved', event);
    if(event.action === 'added') {
      this.cartItemsTotalPrice += event.price;
    } else if(event.action === 'removed') {
      this.cartItemsTotalPrice -= event.price;
    }
  }

}

