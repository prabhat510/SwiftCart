import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClient: HttpClient) { }

  createOrderId(paymentPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + '/payment/orderid';
    return this.httpClient.post(url, paymentPayload);
  }

  createOrder(orderPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + '/order/create';
    return this.httpClient.post(url, orderPayload);
  }

  getOrderDetails(orderId: string) {
    const url = getServiceUrl().swiftCartApiEndpoint + '/order/' + orderId;
    return this.httpClient.get(url);
  }
}
