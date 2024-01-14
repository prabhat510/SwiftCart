import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

import { CartPageComponent } from './cart-page.component';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { of } from 'rxjs';

const productData = {
  "productId": "11",
  "name": "The Psychology of Money",
  "category": "books",
  "image": "https://m.media-amazon.com/images/I/41j2zYDy5cL._SY445_SX342_.jpg",
  "rating": 0,
  "price": 400,
  "description": "first product",
  "isAvailable": true,
  "_id": "658da06781e9b69f8c859e5b",
};
class MockProductService {
  orderSummary$ = {
    next: ()=>{

    }
  }
}

class MockCartService {
  getAllProductsInCart() {
    return of({
      items: [{
        _id: '11',
        productId: {
          ...productData
        },
        userId: 'user1',
        quantity: 2
        }]
    })
  }
}

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CartPageComponent ],
      providers: [
        {provide: ProductService, useClass: MockProductService},
        {provide: CartService, useClass: MockCartService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onCheckout method', ()=>{
    it('should emit value to the subject', inject([ProductService],
      (service: ProductService)=>{
      component.orderSummary = {
        userId: 'user1',
        totalAmount: 100,
        items: [productData],
        shippingAddress: 'demo',
        status: 'pending'
      }
      spyOn(service.orderSummary$, 'next');
      component.onCheckout();
      expect(service.orderSummary$.next).toHaveBeenCalledWith(component.orderSummary);
    }))
  })

  describe('updateTotalPrice method', ()=>{
    it('should update cart items total price on addition of items', inject([ProductService],
      (service: ProductService)=>{
        component.cartItemsTotalPrice = 1000;
        const event = {price: 100, action: "added"};
        component.updateTotalPrice(event);
        expect(component.cartItemsTotalPrice).toEqual(1100);
    }))

    it('should update cart items total price on removal of items', inject([ProductService],
      (service: ProductService)=>{
        component.cartItemsTotalPrice = 1000;
        const event = {price: 100, action: "removed"};
        component.updateTotalPrice(event);
        expect(component.cartItemsTotalPrice).toEqual(900);
    }))

    it('should send cart items total price to subject', inject([OrderService],
      (service: OrderService)=>{
        spyOn(service.cartItemsTotalPrice$, 'next');
        component.cartItemsTotalPrice = 90;
        const event = {price: 10, action: "added"};
        component.updateTotalPrice(event);
        expect(service.cartItemsTotalPrice$.next).toHaveBeenCalledWith(118);
    }))
  })

  describe('fetchCartProducts', ()=>{
    it('should fetch all the products available in cart',
     inject([OrderService], 
      (service: OrderService)=>{
        spyOn(service.cartItemsTotalPrice$, 'next');
        component.fetchCartProducts();
        expect(component.products).toEqual([{
          _id: '11',
          productId: {
            ...productData
          },
          userId: 'user1',
          quantity: 2
          }]);
          expect(component.orderSummary.totalAmount).toEqual(944);
          expect(service.cartItemsTotalPrice$.next).toHaveBeenCalledWith(944);
      }))
  })
});
