import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../../models/item';
import { ActivatedRoute } from '@angular/router';
import { DateHelpers } from '../../lib/date-helpers';
import { PeriodService } from '../../services/period.service';

@Component({
  selector: '[appPeriodDepartmentItem]',
  templateUrl: './period-department-item.component.html',
  styleUrls: ['./period-department-item.component.scss'],
})
export class PeriodDepartmentItemComponent implements OnInit, OnDestroy {
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

  calculatedCopies: number = 0;
  amount: number = 0.0;

  priceSub: Subscription;
  totalCopiesSub: Subscription;
  copiesCalcSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private periodService: PeriodService,
  ) {
    this.items = this.route.snapshot.data.items;
  }

  ngOnInit(): void {
    this.filteredItems = this.department_item.controls[
      'name'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value)),
    );

    this.priceSub = this.department_item
      .get('price')!
      .valueChanges.subscribe(() => {
        this.calculateAmount();
      });

    this.totalCopiesSub = this.department_item
      .get('total_copies')!
      .valueChanges.subscribe(() => {
        this.calculateAmount();
      });

    const days = this.department_item.get('days');
    const dVC = days!.valueChanges.pipe(startWith(days!.value));

    const qty = this.department_item.get('quantity');
    const qtyVC = qty!.valueChanges.pipe(startWith(qty!.value || 1));

    const ded = this.department_item.get('total_deductions');
    const dedVC = ded!.valueChanges.pipe(startWith(ded!.value));

    this.copiesCalcSub = combineLatest([
      this.periodService.startDate$,
      this.periodService.endDate$,
      dVC,
      qtyVC,
      dedVC,
    ]).subscribe(([sd, ed, d, q, de]) => {
      const total = DateHelpers.daysBetween(sd, ed, d) * (q || 1) - de;
      this.calculatedCopies = total;
      if (!this.department_item.get('total_copies')!.pristine)
        this.department_item.get('total_copies')!.reset();
      else this.calculateAmount();
    });
  }

  ngOnDestroy(): void {
    this.priceSub.unsubscribe();
    this.totalCopiesSub.unsubscribe();
    this.copiesCalcSub.unsubscribe();
  }

  setPrice(): void {
    const name = this.department_item.getRawValue().name;
    const price = this.items.find((item) => item.name == name)?.price || 0;
    this.department_item.controls['price'].setValue(price);
  }

  delete(): void {
    this.department_items.removeAt(this.index);
  }
  
  calculateAmount(): void {
    const copies =
      this.department_item.get('total_copies')!.value || this.calculatedCopies;
    this.amount = this.department_item.get('price')!.value * copies;
  }

  private _filter(value: string): Item[] {
    const filterValue = value.toLowerCase();

    return this.items.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }
}
