import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PeriodDepartmentsComponent } from './period-departments.component';
import { PeriodDepartmentComponent } from './period-department/period-department.component';
import { PeriodDepartmentItemsModule } from '../period-department-items/period-department-items.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PeriodDepartmentsComponent, PeriodDepartmentComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    PeriodDepartmentItemsModule,
  ],
  exports: [PeriodDepartmentsComponent],
})
export class PeriodDepartmentsModule {}
