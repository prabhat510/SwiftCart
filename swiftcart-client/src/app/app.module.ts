import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { APP_BASE_HREF } from "@angular/common";
import { CookieService as NgxCookieService} from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemListingComponent } from './components/item-listing/item-listing.component';
import { ItemComponent } from './components/item/item.component';
import { FormsModule } from '@angular/forms';
import { ImageTileComponent } from './components/image-tile/image-tile.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';

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
    OrderSummaryComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [NgxCookieService,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
