import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../../models/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '[appPeriodDepartmentItem]',
  templateUrl: './period-department-item.component.html',
  styleUrls: ['./period-department-item.component.scss'],
})
export class PeriodDepartmentItemComponent implements OnInit {
  @Input('period_department_items') department_items: FormArray;
  @Input('department_item') department_item: FormGroup;
  @Input('index') index: number;

  items: Item[];
  filteredItems: Observable<Item[]>;
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

  constructor(private route: ActivatedRoute) {
    this.items = this.route.snapshot.data.items;
  }

  ngOnInit(): void {
    this.filteredItems = this.department_item.controls[
      'name'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );
  }

  setPrice(): void {
    const name = this.department_item.getRawValue().name;
    const price = this.items.find((item) => item.name == name)?.price || 0;
    this.department_item.controls['price'].setValue(price);
  }

  delete(): void {
    this.department_items.removeAt(this.index);
  }

  private _filter(value: string): Item[] {
    const filterValue = value.toLowerCase();

    return this.items.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }
}
