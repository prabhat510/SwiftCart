import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {

   }

   getAllProducts(queryParams: any) {
    const offset = queryParams.offset;
    const limit = queryParams.limit;
    const url = getServiceUrl().swiftCartApiEndpoint + `/products?offset=${offset}&limit=${limit}`;
    return this.httpClient.get(url);
  }
}
