import { Injectable } from '@angular/core';
import {CookieService as NgxCookieService} from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private ngxCookie: NgxCookieService) { }

  setCookie(key: string, value: string): void {
    this.ngxCookie.put(key, value);
  }

  getCookie(key: string):string {
    return this.ngxCookie.get(key);
  }

  deleteCookie(key: string): void {
    return this.ngxCookie.remove(key);
  }

  deleteAllCookies(): void {
    return this.ngxCookie.removeAll();
  }
}
