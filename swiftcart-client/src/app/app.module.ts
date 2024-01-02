import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { TokenInterceptor } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemListingComponent,
    ItemComponent,
    ImageTileComponent,
    CartPageComponent,
    RegisterUserComponent,
    CartItemComponent,
    PaymentComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
