import { Component, Input } from '@angular/core';
import { DepartmentItemComponent } from '../department-item/department-item.component';
import { ItemsService } from '../../services/items.service';
import { FormBuilder } from '@angular/forms';
import { DepartmentItemsService } from '../../services/department-items.service';
import { Department } from '../../models/department';
import { DepartmentItem } from '../../models/department-item';

@Component({
  selector: '[newDepartmentItem]',
  templateUrl: '../department-item/department-item.component.html',
  styleUrls: ['../department-item/department-item.component.scss'],
})
export class NewDepartmentItemComponent extends DepartmentItemComponent {
  newRecord = true;

  constructor(
    protected itemsService: ItemsService,
    protected fb: FormBuilder,
    protected departmentItemsService: DepartmentItemsService,
  ) {
    super(itemsService, fb, departmentItemsService);
  }

  ngOnInit(): void {
    this.onReset();
  }

  onSave(): void {
    this.departmentItemsService
      .createDepartmentItem(
        this.templateId,
        this.departmentId,
        this.formGroup.getRawValue(),
      )
      .subscribe(({ id }) => {
        this.departmentItems.push(this.createDepartmentItem(id));
        this.onReset();
      });
  }

  onReset(): void {
    this.formGroup = this.fb.group({
      item: '',
      days: '',
      quantity: '',
      price: '',
    });
  }

  private createDepartmentItem(id: string): DepartmentItem {
    const departmentItemParams = this.formGroup.getRawValue();
    const departmentItem: DepartmentItem = {
      ...departmentItemParams,
      item_id: { $oid: this.formGroup.getRawValue().item },
      _id: { $oid: id },
    };
    return departmentItem;
  }
}
