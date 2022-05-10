import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Item } from '../../models/item';
import { DepartmentItem } from '../../models/department-item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentItemsService } from '../../services/department-items.service';

import { DeductionDialogComponent } from '../deduction-dialog/deduction-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: '[appDepartmentItem]',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.scss'],
})
export class DepartmentItemComponent implements OnInit {
  @Input('departmentItem') departmentItem: DepartmentItem;
  @Input('departmentItems') departmentItems: DepartmentItem[];
  @Input('templateId') templateId: string;
  @Input('departmentId') departmentId: string;
  @Input('deleteMode') deleteMode: boolean;
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
  newRecord = false;

  constructor(
    protected itemsService: ItemsService,
    protected fb: FormBuilder,
    protected departmentItemsService: DepartmentItemsService,
    protected dialog: MatDialog,
  ) {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
  }

  ngOnInit(): void {}

  onSave(): void {}

  onReset(): void {}

  onDelete(): void {}

  openDeductionDialog(): void {
    const dialogRef = this.dialog.open(DeductionDialogComponent, {
      width: '288px',
      data: {
        deduction: this.formGroup.getRawValue().deduction || {},
        max: this.formGroup.getRawValue().quantity || 1,
        itemName: this.itemName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.formGroup.patchValue({ deduction: result });
        this.formGroup.markAsDirty();
      }
    });
  }

  get itemPrice(): number {
    const id = this.formGroup.value.item;
    const item = this.items.find((i) => i._id.$oid === id);
    return item?.price || 0;
  }

  get itemName(): string {
    const id = this.formGroup.value.item;
    const item = this.items.find((i) => i._id.$oid === id);
    return item?.name || 'Item';
  }

  protected get id(): string {
    return this.departmentItem._id.$oid;
  }
}
