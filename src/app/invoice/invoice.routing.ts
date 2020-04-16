import { Routes } from '@angular/router';

// import { DashboardComponent } from './dashboard.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

export const InvoiceRoutes: Routes = [
// {
//   path: '**',
//   redirectTo: 'create-invoice'
// },
{
  path: 'create-invoice',
  component: CreateInvoiceComponent
},
{
  path: 'invoice-list',
  component: InvoiceListComponent
}];
