import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { LoginComponent } from './auth/login/login.component';
// import { ViewInvoiceComponent } from './invoice/view-invoice/view-invoice.component';

export const AppRoutes: Routes = [
  {
    path: 'view',
    loadChildren: () => import('./view-receipt-invoice/view-receipt-invoice.module').then(m => m.ViewReceiptInvoiceModule)
  },
  // { path: 'view-invoice', component: ViewInvoiceComponent , data: {invoice_id: String}},
  // { path: 'view-receipt', component: ViewReceiptComponent , data: {trasanction_id: String}},
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: FullComponent,
    children: [
      // {
      //   path: '**',
      //   redirectTo: '/create-invoice',
      //   pathMatch: 'full'
      // },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      // { path: 'invoice', component: CreateInvoiceComponent },
      {
        path: 'invoice',
        loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule)
      }
    ]
  },
  
];
