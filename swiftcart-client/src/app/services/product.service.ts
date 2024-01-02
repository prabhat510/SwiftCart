import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchTerm = new Subject<string>();
  orderSummary$ = new BehaviorSubject<any>({});
  constructor(private httpClient: HttpClient) {

   }

   getAllProducts(queryParams: any) {
    const token = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')).token: null;
    const offset = queryParams.offset;
    const limit = queryParams.limit;
    const url = getServiceUrl().swiftCartApiEndpoint + `/products?offset=${offset}&limit=${limit}`;
    return this.httpClient.get(url);
  }
}
