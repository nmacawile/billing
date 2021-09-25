import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/item';
import { DepartmentItem } from '../../models/department-item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentItemsService } from '../../services/department-items.service';

@Component({
  selector: '[appDepartmentItem]',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss'],
})
export class DepartmentItemComponent implements OnInit {
  @Input('departmentItem') departmentItem: DepartmentItem;
  @Input('templateId') templateId: string;
  @Input('departmentId') departmentId: string;
  items: Item[] = [];
  formGroup: FormGroup;
  scheduleGroups = [
    {
      label: 'Range',
      days: ['Mon-Fri', 'Mon-Sat', 'Mon-Sun', 'Sat-Sun'],
    },
    {
      label: 'Single',
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
    {
      label: 'Rarely Used',
      days: ['Mon-Thu', 'MWF', 'TTh'],
    },
  ];

  constructor(
    private itemsService: ItemsService,
    private fb: FormBuilder,
    private departmentItemsService: DepartmentItemsService,
  ) {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
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
      .subscribe({
        complete: () => {
          this.formGroup.markAsPristine();
        },
      });
  }

  get itemPrice(): number {
    const id = this.formGroup.value.item;
    const item = this.items.find((i) => i._id.$oid === id);
    return item?.price || 0;
  }

  private get id(): string {
    return this.departmentItem._id.$oid;
  }
}
