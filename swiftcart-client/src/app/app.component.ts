import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'swiftcart-client';
  searchKey:string = "";
  user:any;

  constructor(private productService: ProductService, private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    let decoded:any;
    const user = localStorage.getItem('user');
    if(user) {
      console.log("user::::", user);
      this.user = JSON.parse(user);
      decoded = jwtDecode(this.user.token);
    } else {
      this.getNewToken();
    }
   
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.checkTokenValidity(decoded);
      console.log(decoded);
    });

    fetch('https://drive.google.com/file/d/18KV4u_06arPbCROhooI1JbWFx6pPx8Ox/view').then(res=>console.log(res))
  }
  
  search() {
    if(this.searchKey.length > 0){
      this.productService.searchTerm.next(this.searchKey);
    }
  }

  checkTokenValidity(decodedToken: any) {
    // time is in epoch
   if(decodedToken && decodedToken.exp) {
    const currentTime =  Math.floor(Date.now()/1000);
    const tokenExpiryTime = decodedToken.exp;
    console.log(currentTime, tokenExpiryTime);
    if(currentTime > tokenExpiryTime) {
      // get new token
      this.getNewToken();
    }
  } 
  }

  getNewToken() {
    console.log('getting new token...');
    this.authService.getNewToken().subscribe((res: any)=>{
      this.user.token = res.token;
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('got new token...', res.token);
    });
  }
}
