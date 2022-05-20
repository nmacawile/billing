import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { FormBuilderService } from '../services/form-builder.service';

@Component({
  selector: 'app-period-departments',
  templateUrl: './period-departments.component.html',
  styleUrls: ['./period-departments.component.scss'],
})
export class PeriodDepartmentsComponent implements OnInit {
  @Input('period_departments') period_departments: FormArray;

  constructor(private fbs: FormBuilderService) {}

  ngOnInit(): void {}

  addNewDepartment(): void {
    this.period_departments.push(this.fbs.newPeriodDepartmentForm());
  }

  onDelete(i: number): void {
    this.period_departments.removeAt(i);
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
