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
    protected itemsService: ItemsService,
    protected fb: FormBuilder,
    protected departmentItemsService: DepartmentItemsService,
  ) {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
  }

  ngOnInit(): void {}

  onSave(): void {}

  get itemPrice(): number {
    const id = this.formGroup.value.item;
    const item = this.items.find((i) => i._id.$oid === id);
    return item?.price || 0;
  }

  protected get id(): string {
    return this.departmentItem._id.$oid;
  }
}
