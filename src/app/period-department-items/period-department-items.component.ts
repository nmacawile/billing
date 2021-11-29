import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder.service';

@Component({
  selector: 'app-period-department-items',
  templateUrl: './period-department-items.component.html',
  styleUrls: ['./period-department-items.component.scss'],
})
export class PeriodDepartmentItemsComponent implements OnInit {
  @Input('period_department_items') period_department_items: FormArray;
  columns: string[] = ['Name', 'Days', 'Price', 'Qty', 'Off', 'Total', ''];

  constructor(private fbs: FormBuilderService) {}

  ngOnInit(): void {}

  onAddDepartmentItem(): void {
    this.period_department_items.push(this.fbs.periodDepartmentItem());
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
