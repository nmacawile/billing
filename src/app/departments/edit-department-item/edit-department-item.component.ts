import { Component } from '@angular/core';
import { DepartmentItemComponent } from '../department-item/department-item.component';
import { ItemsService } from '../../services/items.service';
import { FormBuilder } from '@angular/forms';
import { DepartmentItemsService } from '../../services/department-items.service';

@Component({
  selector: '[editDepartmentItem]',
  templateUrl: '../department-item/department-item.component.html',
  styleUrls: ['../department-item/department-item.component.scss'],
})
export class EditDepartmentItemComponent extends DepartmentItemComponent {
  constructor(
    protected itemsService: ItemsService,
    protected fb: FormBuilder,
    protected departmentItemsService: DepartmentItemsService,
  ) {
    super(itemsService, fb, departmentItemsService);
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      item: this.departmentItem.item_id.$oid,
      days: this.departmentItem.days,
      quantity: this.departmentItem.quantity,
      price: this.departmentItem.price,
    });
  }

  onSave(): void {
    this.departmentItemsService
      .updateDepartmentItem(
        this.templateId,
        this.departmentId,
        this.id,
        this.formGroup.getRawValue(),
      )
      .subscribe(() => {
        this.formGroup.markAsPristine();
      });
  }
}
