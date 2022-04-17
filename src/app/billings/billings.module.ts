import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingsComponent } from './billings.component';
import { BillingsRoutingModule } from './billings-routing.module';
import { BillingsListComponent } from './billings-list/billings-list.component';
import { MaterialModule } from '../material/material.module';
import { BillingsFormComponent } from './billings-form/billings-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodsModule } from '../periods/periods.module';
import { BillingComponent } from './billing/billing.component';
import { StickyFooterComponent } from './sticky-footer/sticky-footer.component';

@NgModule({
  declarations: [
    BillingsComponent,
    BillingsListComponent,
    BillingsFormComponent,
    BillingComponent,
    StickyFooterComponent,
  ],
  imports: [
    CommonModule,
    BillingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PeriodsModule,
  ],
})
export class BillingsModule {}
