import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'swiftcart-client';
  searchKey:string = "";

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
      // const isPaymentSuccessfull = window.location.href.split('?')[1].includes('success');
      // console.log();
  }
  search() {
    if(this.searchKey.length > 0){
      this.productService.searchTerm.next(this.searchKey);
    }
  }
}
