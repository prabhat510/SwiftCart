import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListingComponent } from './item-listing/item-listing.component';
import { registerLocaleData } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

const routes: Routes = [
  {path: '', component: ItemListingComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'order-summary', component: OrderSummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
