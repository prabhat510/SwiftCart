import { Component, OnInit } from '@angular/core';
import {jsPDF} from 'jspdf';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  orderId:any = '';
  orderData: any = {};
  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.orderId = queryParams.get('orderId');
    this.orderService.getOrderDetails(this.orderId).subscribe((res: any)=>{
      this.orderData = res;
      console.log('order api response', res);
    })
  }

  generateAndOpenPDF(data:any) {
    const pdf = new jsPDF();

    // Add content to the PDF using the fetched data
    pdf.text('PDF Content:', 10, 10);
    pdf.text(this.formatter(data), 10, 20);

    // Open the PDF in a new tab
    const pdfData = pdf.output();
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  formatter(orderedData: any){
    let res = 'Your Order has been placed successfully\n\n\n\n';
    
    for(let key in orderedData.items){
      const product = orderedData.items[key];

      for(let prop in product){
        if(prop === 'price') {
          res += (prop + ' : Rs. ' + product[prop] + '\n\n');
        } else {
        res += (prop + ' : ' + product[prop] + '\n\n');
        }
      }

      res += ' ------------------------------------------------------- \n\n';

    }

    res += 'Total amount paid(including taxes) : Rs. ' + orderedData.totalAmount + '\n\n';

    res += 'Shipping Address  : ' + orderedData.shippingAddress + '\n\n';


    res += '\n\nThank you for shopping with swiftcart.com!!!!\n\n'



    return res;
}

}
