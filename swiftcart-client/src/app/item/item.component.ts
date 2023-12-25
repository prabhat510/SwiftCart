import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() product: any; 
  isItemAlreadyInCart = false;
  userId!:string;

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    const payload = {
      productId: this.product._id
    }
    this.cartService.checkItemAddedToCart(payload, this.userId)
    .subscribe((res:any)=>{
      if(res) {
        this.isItemAlreadyInCart = true;
      } else {
        this.isItemAlreadyInCart = false;
      }
    })
  }
  addToCart() {
    if(this.userId) {
      const payload = {
        productId: this.product._id,
        quantity: 1
      };
      this.cartService.addProductToCart(payload, this.userId)
      .subscribe({
        next: (res)=>{
          this.isItemAlreadyInCart = true;
          console.log("response::", res);
        },
        error: (error)=>{
          console.log("error adding to cart::", error);
        }
      })
    } else {
      alert('cannot add item as userId is not present');
    }
  }

  handleClick() {
    if(this.isItemAlreadyInCart) {
      this.router.navigate(['/cart']);
    } else {
      this.addToCart();
    }
  }
}
