import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { FormArray, FormGroup } from '@angular/forms';
import { PeriodService } from '../../services/period.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
  providers: [PeriodService],
})
export class PeriodComponent implements OnInit {
  @ViewChild('picker', { static: true }) _picker: MatDatepicker<Date>;
  @Input('period') period: FormGroup;

  CLOSE_ON_SELECTED = false;
  init = new Date();
  resetModel = new Date(0);

  selected: Date | null;

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.periodService.periodForm = this.period;
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

  get period_departments(): FormArray {
    return this.period.get('period_departments') as FormArray;
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
      index === -1 ? this.days_off.push(date) : this.days_off.splice(index, 1);
      this.resetModel = new Date(0);
      this.preventDatepickerPopupClose();
    }
  }

  clearDaysOff(e: MatDatepickerInputEvent<Date>): void {
    this.days_off.length = 0;
  }

  remove(date: Date): void {
    const index = this._findDate(date);
    this.days_off.splice(index, 1);
  }

  _findDate(date: Date): number {
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
