import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

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

  constructor(private httpservice: HttpService, public snackBar: MatSnackBar, private route: ActivatedRoute, private titleService: Title, private router: Router) { 
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
      console.log("response from set invoice",res);  
      this.snackBar.open(res.message, '', {
        duration: 2000,
      }); 
      
      this.httpservice.get(this.url+'checkout/new').subscribe((res)=> {
        // this.isLoader = false;
        console.log("respons from checkout new",res);  
      },
      (error)=>{
          console.log(error);
          // window.open('http://localhost:3000/checkouts/new', "_blank");
      });

      window.open(this.url+'checkouts/new');
    },
    (error)=>{
        console.log("error from set invoice: ",error);
        window.open(this.url+'checkouts/new',"_self");
    });
  }

  view_receipt() {
    // window.open(this.url+'checkouts/new_checkout/'+this.invoice.transaction_id);
    this.router.navigateByUrl('view/view-receipt?transaction_id='+this.invoice.transaction_id)
  }

  downloadPng() {
    let ff=this;
    window.scrollTo(0,0);
    html2canvas(document.getElementById('export-div')).then(function(canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function(blob){
          // To download directly on browser default 'downloads' location
          let url = 'Invoice_'+ff.id+'.png'
          let link = document.createElement("a");
          link.download = url;
          link.href = URL.createObjectURL(blob);
          // link.click();
          
          // To save manually somewhere in file explorer
          FileSaver.saveAs(blob, url);

      },'image/png');
    })
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }

  downloadPdf() {
    let ff=this;
    window.scrollTo(0,0);
    html2canvas(document.getElementById('export-div')).then(function(canvas) {
      // Convert the canvas to blob
        canvas.toBlob(function(blob){
        var pdf = new jspdf('p','pt','a4');    
        var img = canvas.toDataURL("image/png");
        pdf.addImage(img, 'PNG', 10, 10, 500, 500);
        let url = 'Invoice_'+ff.id+'.pdf'
        pdf.save(url);

      },'image/png');
    })
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
}
