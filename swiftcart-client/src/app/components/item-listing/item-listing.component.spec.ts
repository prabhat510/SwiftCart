import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ItemListingComponent } from './item-listing.component';

describe('ItemListingComponent', () => {
  let component: ItemListingComponent;
  let fixture: ComponentFixture<ItemListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ItemListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
