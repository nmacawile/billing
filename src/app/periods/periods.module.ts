import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodsComponent } from './periods.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeriodComponent } from './period/period.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [PeriodsComponent, PeriodComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [PeriodsComponent],
})
export class PeriodsModule {}
