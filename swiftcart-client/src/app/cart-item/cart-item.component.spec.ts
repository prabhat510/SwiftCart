import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CartItemComponent } from './cart-item.component';
import { CartService } from '../services/cart.service';
import { of } from 'rxjs';


class MockCartService {
  removeCartItem() {
    return of({
      _id: '122',
      productId: '123',
      userId: "user1",
      quantity: 2
    });
  }
}


describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ CartItemComponent ],
      providers: [
        {provide: CartService, useClass: MockCartService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.cartItem = {
      quantity: 1,
      productId: {
        "productId": "11",
        "name": "The Psychology of Money",
        "category": "books",
        "image": "https://m.media-amazon.com/images/I/41j2zYDy5cL._SY445_SX342_.jpg",
        "rating": 0,
        "price": 400,
        "description": "first product",
        "isAvailable": true,
        "_id": "658da06781e9b69f8c859e5b",
      }
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy() ;
  });

  describe('removeCartItem method', ()=>{
    it('should be defined', ()=>{
      expect(component.removeCartItem).toBeDefined();
    })

    it('should remove item from the cart', ()=>{
      spyOn(component.removeItemEvent, 'emit');
      component.removeCartItem('123');
      expect(component.removeItemEvent.emit).toHaveBeenCalled();
    })
  })
});
