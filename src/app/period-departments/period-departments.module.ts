import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PeriodDepartmentsComponent } from './period-departments.component';
import { PeriodDepartmentComponent } from './period-department/period-department.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PeriodDepartmentsComponent, PeriodDepartmentComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [PeriodDepartmentsComponent],
})
export class PeriodDepartmentsModule {}
