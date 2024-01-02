import { Injectable } from '@angular/core';
import { getServiceUrl } from '../utils/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  registerUser(userPayload: any) {
    const url = getServiceUrl().swiftCartApiEndpoint + '/user/register';
    return this.httpClient.post(url, userPayload);
  }

  getUserId() {
    let userId;
    const user = localStorage.getItem('user');
    if(user) {
      userId = JSON.parse(user).userId;
    }
    return userId;
  }

  getNewToken() {
    const url = getServiceUrl().swiftCartApiEndpoint + '/user/token';
    return this.httpClient.get(url);
  }

  getAccessToken() {
    let token;
    const user = localStorage.getItem('user');
    if(user) {
      token = JSON.parse(user).token;
    }
    return token;
  }
}
