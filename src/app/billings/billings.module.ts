import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingsComponent } from './billings.component';
import { BillingsRoutingModule } from './billings-routing.module';
import { BillingsListComponent } from './billings-list/billings-list.component';
import { MaterialModule } from '../material/material.module';
import { BillingsFormComponent } from './billings-form/billings-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BillingsComponent,
    BillingsListComponent,
    BillingsFormComponent,
  ],
  imports: [
    CommonModule,
    BillingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BillingsModule {}
