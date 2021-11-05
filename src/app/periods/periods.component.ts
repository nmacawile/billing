import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss'],
})
export class PeriodsComponent implements OnInit {
  @Input('periodsFormArray') periodsFormArray: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onAddPeriod(): void {
    this.periodsFormArray.push(
      this.fb.group({
        start_date: '',
        end_date: '',
        days_off: [[]],
        period_departments: [[]],
      }),
    );
  }
}
