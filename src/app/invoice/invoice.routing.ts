import { Routes } from '@angular/router';

// import { DashboardComponent } from './dashboard.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

export const InvoiceRoutes: Routes = [{
  path: '',
  component: CreateInvoiceComponent
}];
