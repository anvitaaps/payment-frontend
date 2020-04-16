import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { InvoiceRoutes } from './invoice.routing';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    // MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(InvoiceRoutes)
  ],
  declarations: [CreateInvoiceComponent, InvoiceListComponent]
})
export class InvoiceModule {}
