import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user:any;

  constructor(private cookie: CookieService, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    console.log("cookie value", this.cookie.getCookie("name"));
  }

}
