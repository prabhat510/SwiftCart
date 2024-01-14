import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListingComponent } from './components/item-listing/item-listing.component';
import { registerLocaleData } from '@angular/common';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', component: ItemListingComponent},
  {path: 'register', component: RegisterUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartPageComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
