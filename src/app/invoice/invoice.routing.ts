import { Routes } from '@angular/router';

// import { DashboardComponent } from './dashboard.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { AuthGuardService } from '../auth/auth-guard.service';

export const InvoiceRoutes: Routes = [
{
  path: 'create-invoice',
  component: CreateInvoiceComponent,
  canActivate: [AuthGuardService]
},
{
  path: 'invoice-list',
  component: InvoiceListComponent,
  canActivate: [AuthGuardService]
},
{
  path: '**',
  redirectTo: 'invoice-list'
}];
