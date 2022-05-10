import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PeriodDepartmentItemsComponent } from './period-department-items.component';
import { PeriodDepartmentItemComponent } from './period-department-item/period-department-item.component';

@NgModule({
  declarations: [
    PeriodDepartmentItemsComponent,
    PeriodDepartmentItemComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [PeriodDepartmentItemsComponent],
})
export class PeriodDepartmentItemsModule {}
