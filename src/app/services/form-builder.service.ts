import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Template } from '../models/template';
import { Department } from '../models/department';
import { DepartmentItem } from '../models/department-item';
import { ItemsService } from './items.service';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  private items: Item[];

  constructor(private fb: FormBuilder, private itemsService: ItemsService) {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
  }

  billingForm(data: { template?: Template; client_name: string }): FormGroup {
    const templateId = data.template?._id.$oid;
    const clientName = data.template?.client_name || data.client_name;
    const departments: Department[] = data.template?.departments || [];

    return this.fb.group({
      template: [{ value: templateId, disabled: true }],
      client_name: clientName,
      client_address: data.template?.client_address,
      _format: data.template?._format,
      start_date: '',
      end_date: '',
      periods: this.fb.array([this.periodForm(departments)]),
    });
  }

  periodForm(departments: Department[] = []): FormGroup {
    let periodDepartmentForms =
      departments.length > 0
        ? departments?.map((d) => this.periodDepartmentForm(d))
        : [this.periodDepartmentForm()];

    return this.fb.group({
      start_date: '',
      end_date: '',
      days_off: [[]],
      period_departments: this.fb.array(periodDepartmentForms),
    });
  }

  periodDepartmentForm(department?: Department): FormGroup {
    const departmentItems = department
      ? department.department_items.map((di) => this.periodDepartmentItem(di))
      : [this.periodDepartmentItem()];

    return this.fb.group({
      name: department?.name,
      period_department_items: this.fb.array(departmentItems),
    });
  }

  periodDepartmentItem(di?: DepartmentItem): FormGroup {
    let item;
    if (di) {
      item = this.items.find((i) => i['_id']['$oid'] == di['item_id']['$oid']);
    }

    return this.fb.group({
      name: item?.name,
      price: di?.price || item?.price,
      days: di?.days,
      quantity: di?.quantity,
      total_copies: '',
      total_deductions: '',
      days_off: [[]],
    });
  }
}
