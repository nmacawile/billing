import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { shareReplay, startWith } from 'rxjs/operators';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable()
export class PeriodService implements OnDestroy {
  private _periodForm: FormGroup;
  private _startDateSub: Subscription;
  private _endDateSub: Subscription;

  startDate$ = new BehaviorSubject<Date>(new Date());
  endDate$ = new BehaviorSubject<Date>(new Date());

  constructor() {}

  ngOnDestroy() {
    this._startDateSub.unsubscribe();
    this._endDateSub.unsubscribe();
  }

  set periodForm(periodForm: FormGroup) {
    this._periodForm = periodForm;
    const startDate = periodForm.get('start_date')!.value;
    const endDate = periodForm.get('end_date')!.value;

    this._startDateSub = this._periodForm
      .get('start_date')!
      .valueChanges.subscribe((date) => this.startDate$.next(date));
    this._endDateSub = this._periodForm
      .get('end_date')!
      .valueChanges.subscribe((date) => this.endDate$.next(date));

    this.startDate$.next(startDate);
    this.endDate$.next(endDate);
  }
}
