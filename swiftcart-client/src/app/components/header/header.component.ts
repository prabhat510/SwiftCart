import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchKey:string = "";
  isLoggedin = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedin = this.authService.isLoggedIn;
  }

    
  search() {
    if(this.searchKey.length > 0){
      // this.productService.searchTerm.next(this.searchKey);
    }
  }

}
