import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  orderData:any;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  
    this.productService.orderData$.subscribe(res =>{
      console.log('order data', res)
      this.orderData = res;
      let address = localStorage.getItem('address');
      if(address) {
        const add = JSON.parse(address);
        this.orderData.shippingAddress = add.shipment;
      }
     
    })
  }

}
