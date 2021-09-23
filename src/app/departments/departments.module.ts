import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { DepartmentItemComponent } from './department-item/department-item.component';

@NgModule({
  declarations: [DepartmentsComponent, DepartmentComponent, DepartmentItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
  ],
  exports: [DepartmentsComponent],
})
export class DepartmentsModule {}
