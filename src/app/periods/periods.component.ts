import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FormBuilderService } from '../services/form-builder.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../models/department';
import { DateHelpers } from '../lib/date-helpers';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss'],
})
export class PeriodsComponent implements OnInit {
  @Input('periodsFormArray') periodsFormArray: FormArray;
  departments: Department[];
  selected = new FormControl(0);

  constructor(private fbs: FormBuilderService, private route: ActivatedRoute) {
    this.departments =
      this.route.snapshot.data.template?.departments ||
      this.route.snapshot.data.combined?.template?.departments;
  }

  ngOnInit(): void {}

  onAddPeriod(): void {
    const periodsCount = this.periodsFormArray.getRawValue().length;
    let dateRange;

    if (periodsCount > 0)
      dateRange = DateHelpers.getNext(
        this.periodsFormArray.getRawValue()[periodsCount - 1].start_date,
      );

    this.periodsFormArray.push(
      this.fbs.newPeriodForm(this.departments, dateRange),
    );
    this.selected.setValue(periodsCount);
  }

  onDeletePeriod(index: number): void {
    this.periodsFormArray.removeAt(index);
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
