import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';


export interface InvoiceElement {
  invoice_id: string;
  customer_name: number;
  customer_phone: number;
  customer_email: string;
  customer_address: string;
  amount: string;
  service: string;
  transaction_id: string;
  status: string;
}

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})

export class InvoiceListComponent implements OnInit {

  url;
  displayedColumns = ['invoice_id', 'customer_name', 'customer_email', 'amount', 'service', 'transaction_id', 'status', 'invoice'];
  dataSource: InvoiceElement[] = [];
  constructor(private httpservice: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.url = environment.api_endpoint;
    this.get_invoice_list();
  }

  get_invoice_list() {
    this.httpservice.get(this.url+'get_invoice_list').subscribe((res)=> {
      // this.isLoader = false;
      console.log("response",res);  
      this.dataSource = res.lists;
      // this.router.navigateByUrl('view-invoice/'+res.invoice_id)
    },
    (error)=>{
        console.log(error);
    });
  }

  view_invoice(id) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['view/view-invoice'], { queryParams: { invoice_id: id} }));
      window.open('#'+url, '_blank');
    // this.router.navigate(['view-invoice'],{ queryParams: { invoice_id: id}})
  }


}
