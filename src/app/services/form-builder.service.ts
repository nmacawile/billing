import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Template } from '../models/template';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  billingForm(data: { template?: Template; client_name: string}): FormGroup {
    const templateId = data.template?._id.$oid;
    const clientName = data.template?.client_name || data.client_name;

    return this.fb.group({
      template: [{ value: templateId, disabled: true }],
      client_name: clientName,
      client_address: data.template?.client_address,
      _format: data.template?._format,
      start_date: '',
      end_date: '',
      periods: this.fb.array([this.periodForm()]),
    });
  }

  periodForm(): FormGroup {
    return this.fb.group({
      start_date: '',
      end_date: '',
      days_off: [[]],
      period_departments: this.fb.array([this.periodDepartmentForm()]),
    });
  }

  periodDepartmentForm(): FormGroup {
    return this.fb.group({
      name: '',
      period_department_items: this.fb.array([this.periodDepartmentItem()]),
    });
  }

  periodDepartmentItem(): FormGroup {
    return this.fb.group({
      name: '',
      price: '',
      days: '',
      quantity: '',
      total_copies: '',
      total_deductions: '',
      days_off: [[]],
    });
  }
}
