import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder.service';
import { PeriodService } from '../services/period.service';

@Component({
  selector: 'app-period-departments',
  templateUrl: './period-departments.component.html',
  styleUrls: ['./period-departments.component.scss'],
})
export class PeriodDepartmentsComponent implements OnInit {
  @Input('period_departments') period_departments: FormArray;

  constructor(
    private fbs: FormBuilderService,
    private periodService: PeriodService,
  ) {}

  ngOnInit(): void {}

  addNewDepartment(): void {
    const days_off = [...this.periodService.daysOff];
    const periodDepartmentForm = this.fbs.newPeriodDepartmentForm({ days_off });
    this.period_departments.push(periodDepartmentForm);
  }

  onDelete(i: number): void {
    this.period_departments.removeAt(i);
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
