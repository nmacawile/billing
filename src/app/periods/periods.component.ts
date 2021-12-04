import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../services/form-builder.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../models/department';

@Component({
  selector: 'app-periods',
  templateUrl: './periods.component.html',
  styleUrls: ['./periods.component.scss'],
})
export class PeriodsComponent implements OnInit {
  @Input('periodsFormArray') periodsFormArray: FormArray;
  departments: Department[];

  constructor(private fbs: FormBuilderService, private route: ActivatedRoute) {
    this.departments = this.route.snapshot.data.template?.departments;
  }

  ngOnInit(): void {}

  onAddPeriod(): void {
    this.periodsFormArray.push(this.fbs.periodForm(this.departments));
  }

  toFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
