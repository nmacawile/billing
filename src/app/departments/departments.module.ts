import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsComponent } from './departments.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { DepartmentItemComponent } from './department-item/department-item.component';
import { NewDepartmentItemComponent } from './new-department-item/new-department-item.component';
import { EditDepartmentItemComponent } from './edit-department-item/edit-department-item.component';
import { DeductionDialogComponent } from './deduction-dialog/deduction-dialog.component';

@NgModule({
  declarations: [
    DepartmentsComponent,
    DepartmentComponent,
    DepartmentItemComponent,
    NewDepartmentItemComponent,
    EditDepartmentItemComponent,
    DeductionDialogComponent,
  ],
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
