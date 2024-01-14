import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  addProductToCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/addItem`;
    return this.httpClient.post(url, productPayload);
  }

  checkItemAddedToCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/item/exists`;
    return this.httpClient.post(url, productPayload);
  }

  getAllProductsInCart() {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/items`;
    return this.httpClient.get(url);
  }

  updateCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/update`;
    return this.httpClient.put(url, productPayload);
  }

  createUserCart(productPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + `/carts/create`;
    return this.httpClient.post(url, productPayload);
  }
  
}
