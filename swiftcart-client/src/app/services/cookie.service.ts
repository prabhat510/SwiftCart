import { Injectable } from '@angular/core';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(private ngxCookie: NgxCookieService) { }

  setCookie(key: string, value: string): void {
    // this.ngxCookie.set(key, value, 1, '/', window.location.origin, false, 'Lax');
    document.cookie = `${key}=${value}; expires=Sun, 20 Jul 2025 19:45:00 UTC; path=/`;
  }

  getCookie(key: string):string {
    return this.ngxCookie.get(key);
  }

  deleteCookie(key: string): void {
    return this.ngxCookie.delete(key, '/');
  }

  deleteAllCookies(): void {
    return this.ngxCookie.deleteAll('/');
  }
}
