import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ItemComponent } from './item.component';
import { Router } from '@angular/router';

class MockRouter {

}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.product = {
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
    fixture.detectChanges();
  });

  it('should create', () => {
 
    expect(component).toBeTruthy();
  });

  describe('handleClick', ()=>{
    it('should navigate to cart page if the item already exists in the cart', inject([Router], (
      router: Router
    )=>{
      spyOn(router, 'navigate');
      component.isItemAlreadyInCart = true;
      component.handleClick();
      expect(router.navigate).toHaveBeenCalledWith(['/cart']);
    }))

    it('should add item to cart page if the item doesnot exists in the cart', inject([Router], (
      router: Router
    )=>{
      spyOn(component, 'addToCart');
      component.isItemAlreadyInCart = false;
      component.handleClick();
      expect(component.addToCart).toHaveBeenCalled();
    }))
  })
});
