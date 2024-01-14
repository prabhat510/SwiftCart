import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListingComponent } from './components/item-listing/item-listing.component';
import { registerLocaleData } from '@angular/common';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

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
