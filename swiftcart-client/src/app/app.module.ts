import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListingComponent } from './item-listing/item-listing.component';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { ImageTileComponent } from './image-tile/image-tile.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListingComponent,
    ItemComponent,
    ImageTileComponent,
    CartPageComponent,
    RegisterUserComponent,
    CartItemComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
