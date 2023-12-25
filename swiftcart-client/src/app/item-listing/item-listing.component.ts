import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {

  products = [];
  limit = 10;
  offset = 0;
  totalProducts = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    const queryParams = {
      limit: this.limit,
      offset: this.offset
    };
    this.productService.getAllProducts(queryParams)
    .subscribe({
      next: (res:any)=>{
        this.products = res.products;
        this.totalProducts = res.totalCount;
        console.log('count', this.totalProducts, 'res', this.products);
      }
    })
  }

}
