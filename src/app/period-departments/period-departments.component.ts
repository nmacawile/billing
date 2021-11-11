import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-period-departments',
  templateUrl: './period-departments.component.html',
  styleUrls: ['./period-departments.component.scss'],
})
export class PeriodDepartmentsComponent implements OnInit {
  @Input('period_departments') period_departments: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  addNewDepartment(): void {
    this.period_departments.push(
      this.fb.group({ name: '', period_department_items: this.fb.array([]) }),
    );
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
