import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../interfaces/product.interface';
import { getServiceUrl } from '../../utils/api.config';

@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {

  products: Array<IProduct> = [];
  limit = 10;
  offset = 0;
  totalProducts = 0;
  filterTerm: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

    this.productService.searchTerm.subscribe(res => this.filterTerm = res);

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
