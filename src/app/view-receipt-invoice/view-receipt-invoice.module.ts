import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewReceiptComponent } from './view-receipt/view-receipt.component';
import { SharedModule } from '../shared/shared.module';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

const ViewRoutes: Routes = [
  {
    path: 'view-invoice',
    component: ViewInvoiceComponent,
    // canActivate: [AuthGuardService] 
  },
  {
    path: 'view-receipt',
    component: ViewReceiptComponent,
    // canActivate: [AuthGuardService] 
  },
  {path: '**', redirectTo: 'view-invoice'}];

@NgModule({
  declarations: [ViewInvoiceComponent, ViewReceiptComponent],
  imports: [
    // BrowserModule,
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(ViewRoutes)
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ]
})
export class ViewReceiptInvoiceModule { }
