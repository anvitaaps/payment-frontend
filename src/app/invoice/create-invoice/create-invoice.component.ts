import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  url;
  invoiceForm = new FormGroup({
    customerName: new FormControl('',Validators.required),
    customerEmail: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    customerPhone: new FormControl('',Validators.required),
    customerAddress: new FormControl('',Validators.required),
    amount: new FormControl('',Validators.required),
    service: new FormControl('',Validators.required)
  });
  
  public constructor(private titleService: Title, private httpservice: HttpService, public snackBar: MatSnackBar, private router: Router) { 
    this.titleService.setTitle( 'Create Invoice' );
    this.url = environment.api_endpoint;
	}
  ngOnInit(): void {
  }

  create_invoice() {
    console.log(this.invoiceForm);
    var d = new Date();
    var n = d.getMilliseconds();
    let data = {
        customer_name: this.invoiceForm.value.customerName,
        customer_phone: this.invoiceForm.value.customerPhone,
        customer_email: this.invoiceForm.value.customerEmail,
        customer_address: this.invoiceForm.value.customerAddress,
        amount: this.invoiceForm.value.amount,
        service: this.invoiceForm.value.service,
        invoice_date: d
    }
    this.httpservice.post(this.url+'create_invoice', data).subscribe((res)=> {
      // this.isLoader = false;
      console.log("response",res);  
      this.snackBar.open(res.message, '', {
        duration: 2000,
      }); 
      // this.invoiceForm.markAsPristine();
      // this.invoiceForm.markAsUntouched();
      this.invoiceForm.reset();
      const url = this.router.serializeUrl(this.router.createUrlTree(['view/view-invoice'], { queryParams: { invoice_id: res.invoice_id} }));
      window.open('#'+url, '_blank');
      // this.router.navigate(['view-invoice'],{ queryParams: { invoice_id: res.invoice_id}})
    },
    (error)=>{
        console.log(error);
        this.snackBar.open(error.message, '', {
          duration: 2000,
        }); 
    });
  }
}
