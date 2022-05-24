import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder.service';
import { PeriodService } from '../services/period.service';

@Component({
  selector: 'app-period-department-items',
  templateUrl: './period-department-items.component.html',
  styleUrls: ['./period-department-items.component.scss'],
})
export class PeriodDepartmentItemsComponent implements OnInit {
  @Input('period_department_items') period_department_items: FormArray;
  columns: string[] = [
    'Name',
    'Days',
    'Price',
    'Qty',
    'Off',
    'Total',
    'Amount',
    '',
  ];

  constructor(
    private fbs: FormBuilderService,
    private periodService: PeriodService,
  ) {}

  ngOnInit(): void {}

  onAddDepartmentItem(): void {
    const days_off = [...this.periodService.daysOff];
    const periodDepartmentForm = this.fbs.newPeriodDepartmentItemForm({
      days_off,
    });
    this.period_department_items.push(periodDepartmentForm);
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
