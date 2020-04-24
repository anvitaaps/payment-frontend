import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent implements OnInit {
  url;
  transaction_id;
  transaction;
  customer;

  constructor(private httpservice: HttpService, public snackBar: MatSnackBar, private route: ActivatedRoute, private titleService: Title, private router: Router) {
    this.titleService.setTitle( 'View Receipt' );
    this.transaction_id = this.route.snapshot.queryParams.transaction_id;
   }

  ngOnInit(): void {
    this.url = environment.api_endpoint;

    this.get_customer_details();
    this.view_receipt();
  }

  get_customer_details() {
    this.httpservice.get(this.url+'get_invoice_by_transaction_id/'+this.transaction_id).subscribe((res)=> {
      // this.isLoader = false;
      console.log("response from customer: ",res);  
      this.customer = res.lists[0];
      // this.snackBar.open(res.message, '', {
      //   duration: 2000,
      // }); 
    },
    (error)=>{
        console.log("error from transaction: ",error);
    });
  }

  view_receipt() {
    // window.open(this.url+'checkouts/new_checkout/'+this.invoice.transaction_id);
    this.httpservice.get(this.url+'checkouts/new_checkout/'+this.transaction_id).subscribe((res)=> {
      // this.isLoader = false;
      console.log("response from transaction",res);  
      this.transaction = res.data;
      // this.snackBar.open(res.message, '', {
      //   duration: 2000,
      // }); 
    },
    (error)=>{
        console.log("error from transaction: ",error);
    });
  }

  view_invoice() {
    this.router.navigateByUrl('view-invoice?invoice_id='+this.customer.invoice_id)
  }

}
