import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  cartItemsTotalPrice$ = new BehaviorSubject<number>(0);
  constructor(private httpClient: HttpClient) { }

  createOrderId(paymentPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + '/payment/orderid';
    return this.httpClient.post(url, paymentPayload);
  }

}
