import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { FormGroup } from '@angular/forms';
import { PeriodService } from '../../services/period.service';
import { Subject } from 'rxjs';
import { PeriodDepartmentItemService } from '../../services/period-department-item.service';

@Component({
  selector: 'app-item-multi-date-range-picker',
  templateUrl: './item-multi-date-range-picker.component.html',
  styleUrls: ['./item-multi-date-range-picker.component.scss'],
})
export class ItemMultiDateRangePickerComponent implements OnInit {
  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;
  @Input('department_item') department_item: FormGroup;

  CLOSE_ON_SELECTED = false;
  resetModel = new Date(0);
  calendarStart$: Subject<Date>;

  constructor(
    private periodService: PeriodService,
    private periodDepartmentItemService: PeriodDepartmentItemService,
  ) {}

  ngOnInit(): void {
    this.calendarStart$ = this.periodService.startDate$;
  }

  dateChanged(event: MatDatepickerInputEvent<Date>): void {
    if (event.value) {
      const date = event.value;
      this.periodDepartmentItemService.toggleSelectOffDay(date);
      this.resetModel = new Date(0);
      this.preventDatepickerPopupClose();
    }
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
    if (this.periodDepartmentItemService.findDate(date) !== -1) {
      return ['selected'];
    }
    return [];
  };

  private get days_off(): Date[] {
    let _days_off = this.periodDepartmentItemService.daysOff.value;
    _days_off = _days_off || [];
    return _days_off;
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
