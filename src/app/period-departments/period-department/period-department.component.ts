import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-period-department',
  templateUrl: './period-department.component.html',
  styleUrls: ['./period-department.component.scss'],
})
export class PeriodDepartmentComponent implements OnInit {
  @Input('department_form') department_form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
