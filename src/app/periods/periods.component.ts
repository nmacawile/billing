import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder.service';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss'],
})
export class PeriodsComponent implements OnInit {
  @Input('periodsFormArray') periodsFormArray: FormArray;

  constructor(private fbs: FormBuilderService) {}

  ngOnInit(): void {}

  onAddPeriod(): void {
    this.periodsFormArray.push(this.fbs.periodForm());
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
