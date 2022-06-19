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
import { SharedModule } from '../shared/shared.module';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [
    BillingsComponent,
    BillingsListComponent,
    BillingsFormComponent,
    BillingComponent,
    StickyFooterComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    BillingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PeriodsModule,
    SharedModule,
  ],
})
export class BillingsModule {}
