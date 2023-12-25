import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  addProductToCart(productPayload: any, userId: string) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/cart/addItem/${userId}`;
    return this.httpClient.post(url, productPayload);
  }

  checkItemAddedToCart(productPayload: any, userId: string) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/cart/item/exists/${userId}`;
    return this.httpClient.post(url, productPayload);
  }

  getAllProductsInCart(userId: string) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/cart/items/${userId}`;
    return this.httpClient.get(url);
  }

  updateItemQuantity(productPayload: any, userId: string) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/cart/updateItem/${userId}`;
    return this.httpClient.put(url, productPayload);
  }
  
  removeCartItem(productPayload: any, userId: string) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/cart/deleteItem/${userId}`;
    return this.httpClient.delete(url, {body: productPayload});
  }
}
