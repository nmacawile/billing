import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodService } from '../../services/period.service';
import { FormGroup } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-multi-date-range-picker',
  templateUrl: './multi-date-range-picker.component.html',
  styleUrls: ['./multi-date-range-picker.component.scss'],
})
export class MultiDateRangePickerComponent implements OnInit {
  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;
  period: FormGroup;

  CLOSE_ON_SELECTED = false;
  calendarStart$: Subject<Date>;
  resetModel = new Date(0);
  selected: Date | null;

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.calendarStart$ = this.periodService.startDate$;
    this.period = this.periodService.periodForm;
  }

  get start_date(): Date {
    return this.period.get('start_date')?.value;
  }

  get end_date(): Date {
    return this.period.get('end_date')?.value;
  }

  get days_off(): Date[] {
    return this.period.get('days_off')?.value;
  }

  get unsetPeriod(): boolean {
    return !this.start_date || !this.end_date;
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
    this.periodService.addOffDay$.next(date);
    this.days_off.push(date);
  }

  removeOffDay(date: Date): void {
    const index = this._findDate(date);
    this.periodService.removeOffDay$.next(date);
    this.days_off.splice(index, 1);
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
