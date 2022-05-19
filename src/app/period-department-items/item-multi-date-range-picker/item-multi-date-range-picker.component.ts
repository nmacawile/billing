import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { FormGroup } from '@angular/forms';
import { PeriodService } from '../../services/period.service';
import { Subject, Subscription, merge } from 'rxjs';

@Component({
  selector: 'app-item-multi-date-range-picker',
  templateUrl: './item-multi-date-range-picker.component.html',
  styleUrls: ['./item-multi-date-range-picker.component.scss'],
})
export class ItemMultiDateRangePickerComponent implements OnInit, OnDestroy {
  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;
  @Input('department_item') department_item: FormGroup;

  CLOSE_ON_SELECTED = false;
  resetModel = new Date(0);
  calendarStart$: Subject<Date>;

  addOffDaySub: Subscription;
  removeOffDaySub: Subscription;
  coverageDateSub: Subscription;

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.calendarStart$ = this.periodService.startDate$;
    this.addOffDaySub = this.periodService.addOffDay$.subscribe((date) =>
      this.addOffDay(date),
    );
    this.removeOffDaySub = this.periodService.removeOffDay$.subscribe((date) =>
      this.removeOffDay(date),
    );
    this.coverageDateSub = merge(
      this.periodService.startDate$,
      this.periodService.endDate$,
    ).subscribe(() => (this.days_off.length = 0));
  }

  ngOnDestroy(): void {
    this.addOffDaySub.unsubscribe();
    this.removeOffDaySub.unsubscribe();
    this.coverageDateSub.unsubscribe();
  }

  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      const index = this._findDate(date);
      index === -1 ? this.addOffDay(date) : this.removeOffDay(date);
      this.resetModel = new Date(0);
      this.preventDatepickerPopupClose();
    }
  }

  addOffDay(date: Date): void {
    const index = this._findDate(date);
    if (index === -1) this.days_off.push(date);
  }

  removeOffDay(date: Date): void {
    const index = this._findDate(date);
    if (index !== -1) this.days_off.splice(index, 1);
  }

  get start_date(): Date {
    return this.periodService.periodForm.get('start_date')?.value;
  }

  get end_date(): Date {
    return this.periodService.periodForm.get('end_date')?.value;
  }

  get unsetPeriod(): boolean {
    return !this.start_date || !this.end_date;
  }

  get daysOffCount(): number {
    return this.days_off.length;
  }

  offDaysFilter = (d: Date | null): boolean => {
    if (this.unsetPeriod) return true;
    return !!d && d >= this.start_date && d <= this.end_date;
  };

  dateClass = (date: Date) => {
    if (this._findDate(date) !== -1) {
      return ['selected'];
    }
    return [];
  };

  private get days_off(): Date[] {
    let _days_off = this.department_item.get('days_off')?.value;
    _days_off = _days_off || [];
    return _days_off;
  }

  private _findDate(date: Date): number {
    return this.days_off.map((m) => +m).indexOf(+date);
  }

  private preventDatepickerPopupClose(): void {
    if (!this.CLOSE_ON_SELECTED) {
      const closeFn = this._picker.close;
      this._picker.close = () => {};
      this._picker[
        '_componentRef'
      ].instance._calendar.monthView._createWeekCells();
      setTimeout(() => {
        this._picker.close = closeFn;
      });
    }
  }
}
