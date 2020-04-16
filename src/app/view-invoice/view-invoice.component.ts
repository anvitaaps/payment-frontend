import { Component, OnInit } from '@angular/core';
// import { HttpService } from '../../services/http.service';
// import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  url;
  sub;
  id;
  invoice;

  constructor(private httpservice: HttpService, public snackBar: MatSnackBar, private route: ActivatedRoute, private titleService: Title) { 
    this.titleService.setTitle( 'View Invoice' );
    this.id = this.route.snapshot.queryParams.invoice_id;
    console.log('id: ', this.id);
  }

  ngOnInit(): void {
    this.url = environment.api_endpoint;
    this.get_invoice_details();
    // console.log(this.params)
  }

  get_invoice_details() {
    this.httpservice.get(this.url+'get_invoice_by_id/'+this.id).subscribe((res)=> {
      // this.isLoader = false;
      console.log("response",res);  
      // this.snackBar.open(res.message, '', {
      //   duration: 2000,
      // }); 
      this.invoice = res.lists[0];
      // this.router.navigateByUrl('view-invoice/'+res.invoice_id)
    },
    (error)=>{
        console.log(error);
    });
  }

  pay() {
    this.httpservice.get(this.url+'set_invoice_id/'+this.id).subscribe((res)=> {
      // this.isLoader = false;
      console.log("response",res);  
      this.snackBar.open(res.message, '', {
        duration: 2000,
      }); 
      
      this.httpservice.get(this.url+'checkout/new').subscribe((res)=> {
        // this.isLoader = false;
        console.log("response",res);  
        // this.snackBar.open(res.message, '', {
        //   duration: 2000,
        // }); 
        
        // window.open('localhost:3000');
      },
      (error)=>{
          console.log(error);
          // window.open('http://localhost:3000/checkouts/new', "_blank");
      });

      window.open('localhost:3000');
    },
    (error)=>{
        console.log(error);
        // window.open('http://localhost:3000/checkouts/new');
    });
  }

  view_receipt() {
    window.open('http://localhost:3000/checkouts/new_checkout/'+this.invoice.transaction_id,'_blank');
  }
}
