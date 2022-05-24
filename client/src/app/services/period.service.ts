import { Injectable, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { shareReplay, startWith } from 'rxjs/operators';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable()
export class PeriodService implements OnDestroy {
  private _periodForm: FormGroup;
  private _startDateSub: Subscription;
  private _endDateSub: Subscription;
  private _coverageDateChangeSub: Subscription;

  startDate$ = new BehaviorSubject<Date>(new Date());
  endDate$ = new BehaviorSubject<Date>(new Date());
  addOffDay$ = new Subject<Date>();
  removeOffDay$ = new Subject<Date>();
  coverageDateChange$ = new Subject<Date>();

  constructor() {}

  ngOnDestroy() {
    this._startDateSub.unsubscribe();
    this._endDateSub.unsubscribe();
    this._coverageDateChangeSub.unsubscribe();
  }

  clearDaysOff(): void {
    this.periodForm.patchValue({ days_off: [] });
  }

  get periodForm(): FormGroup {
    return this._periodForm;
  }

  get daysOff(): Array<Date> {
    return this.periodForm.get('days_off')!.value;
  }

  get periodDepartments(): FormArray {
    return this.periodForm.get('period_departments') as FormArray;
  }

  set periodForm(periodForm: FormGroup) {
    this._periodForm = periodForm;
    const startDate = periodForm.get('start_date')!.value;
    const endDate = periodForm.get('end_date')!.value;

    this._startDateSub = this._periodForm
      .get('start_date')!
      .valueChanges.subscribe((date) => {
        this.startDate$.next(date);
        this.coverageDateChange$.next(date);
      });
    this._endDateSub = this._periodForm
      .get('end_date')!
      .valueChanges.subscribe((date) => {
        this.endDate$.next(date);
        this.coverageDateChange$.next(date);
      });
    this._coverageDateChangeSub = this.coverageDateChange$.subscribe(() =>
      this.clearDaysOff(),
    );

    this.startDate$.next(startDate);
    this.endDate$.next(endDate);
  }
}
