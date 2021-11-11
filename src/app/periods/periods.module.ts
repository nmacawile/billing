import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodsComponent } from './periods.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodComponent } from './period/period.component';
import { MaterialModule } from '../material/material.module';
import { PeriodDepartmentsModule } from '../period-departments/period-departments.module';

@NgModule({
  declarations: [PeriodsComponent, PeriodComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PeriodDepartmentsModule,
  ],
  exports: [PeriodsComponent],
})
export class PeriodsModule {}
