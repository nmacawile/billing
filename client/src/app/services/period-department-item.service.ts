import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PeriodService } from './period.service';
import { startWith } from 'rxjs/operators';
import { ConnectableObservable, Subject } from 'rxjs';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { DateHelpers } from '../lib/date-helpers';

@Injectable()
export class PeriodDepartmentItemService implements OnDestroy {
  private _periodDepartmentItemForm: FormGroup;
  private _recalculateCopiesSub: Subscription;
  private _priceSub: Subscription;
  private _totalCopiesSub: Subscription;
  private _coverageDateChangeSub: Subscription;
  private _addOffDaySub: Subscription;
  private _removeOffDaySub: Subscription;
  private _daysSub: Subscription;
  private _quantitySub: Subscription;
  private _amount: number = 0.0;
  private _calculatedCopies: number = 0;
  private _loadedCustomValue = false;

  private _copiesCalculationFunction = ([sd, ed, d, q, de]: [
    Date,
    Date,
    string,
    number,
    number,
  ]) => {
    const total =
      DateHelpers.daysBetween(sd, ed, d) * this.defaultToOne(q) - de;
    this._calculatedCopies = total;
    if (this._loadedCustomValue || this.totalCopiesUnset) {
      this._periodDepartmentItemForm.patchValue(
        { total_copies: total },
        { emitEvent: false },
      );
    }
    this._loadedCustomValue = true;
    this._recalculateAmount();
  };

  constructor(private periodService: PeriodService) {}

  ngOnDestroy(): void {
    this._recalculateCopiesSub.unsubscribe();
    this._priceSub.unsubscribe();
    this._totalCopiesSub.unsubscribe();
    this._coverageDateChangeSub.unsubscribe();
    this._addOffDaySub.unsubscribe();
    this._removeOffDaySub.unsubscribe();
    this._daysSub.unsubscribe();
    this._quantitySub.unsubscribe();
  }

  get periodDepartmentItemForm(): FormGroup {
    return this._periodDepartmentItemForm;
  }

  get days(): FormControl {
    return this._periodDepartmentItemForm.get('days') as FormControl;
  }

  get daysOff(): FormControl {
    return this._periodDepartmentItemForm.get('days_off') as FormControl;
  }

  get days$(): Observable<string> {
    return this.days.valueChanges.pipe(startWith(this.days.value));
  }

  get quantity(): FormControl {
    return this._periodDepartmentItemForm.get('quantity') as FormControl;
  }

  get quantity$(): Observable<number> {
    const initialQty = this.defaultToOne(this.quantity.value);
    return this.quantity.valueChanges.pipe(startWith(initialQty));
  }

  get deductions(): FormControl {
    return this._periodDepartmentItemForm.get(
      'total_deductions',
    ) as FormControl;
  }

  get deductions$(): Observable<number> {
    return this.deductions.valueChanges.pipe(startWith(this.deductions.value));
  }

  get price(): FormControl {
    return this._periodDepartmentItemForm.get('price') as FormControl;
  }

  get amount(): FormControl {
    return this._periodDepartmentItemForm.get('amount') as FormControl;
  }

  get totalCopies(): FormControl {
    return this._periodDepartmentItemForm.get('total_copies') as FormControl;
  }

  get recalculateCopies$(): Observable<[Date, Date, string, number, number]> {
    return combineLatest([
      this.periodService.startDate$,
      this.periodService.endDate$,
      this.days$,
      this.quantity$,
      this.deductions$,
    ]);
  }

  get calculatedCopies(): number {
    return this._calculatedCopies;
  }

  get totalCopiesUnset(): boolean {
    return !this.totalCopies.value && this.totalCopies.value !== 0;
  }

  autofillTotalCopiesValue(): void {
    if (this.totalCopiesUnset)
      this._periodDepartmentItemForm.patchValue(
        { total_copies: this.calculatedCopies },
        { emitEvent: false },
      );
  }

  setForm(form: FormGroup): void {
    this._periodDepartmentItemForm = form;
    this._recalculateCopiesSub = this.recalculateCopies$.subscribe(
      this._copiesCalculationFunction,
    );
    this._priceSub = this.price.valueChanges.subscribe(() => {
      this._recalculateAmount();
    });
    this._totalCopiesSub = this.totalCopies.valueChanges.subscribe(() => {
      this._recalculateAmount();
    });
    this._coverageDateChangeSub =
      this.periodService.coverageDateChange$.subscribe(() =>
        this.clearOffDays(),
      );
    this._addOffDaySub = this.periodService.addOffDay$.subscribe((date) =>
      this.addOffDayWithCheck(date),
    );
    this._removeOffDaySub = this.periodService.removeOffDay$.subscribe((date) =>
      this.removeOffDayWithCheck(date),
    );
    this._daysSub = this.days.valueChanges.subscribe(() =>
      this.recalculateDeductions(),
    );
    this._quantitySub = this.quantity.valueChanges.subscribe(() =>
      this.recalculateDeductions(),
    );
  }

  recalculateDeductions(): void {
    const offDaysCount = DateHelpers.countDeductions(
      this.days.value,
      this.daysOff.value,
    );
    const quantity = this.defaultToOne(this.quantity.value);
    const deductions = offDaysCount * quantity;
    deductions
      ? this.deductions.setValue(offDaysCount * quantity)
      : this.deductions.reset();
  }

  toggleSelectOffDay(date: Date): void {
    const index = this.findDate(date);
    index === -1 ? this.addOffDay(date) : this.removeOffDayAt(index);
  }

  findDate(date: Date): number {
    return (this.daysOff.value as Date[]).map((m) => +m).indexOf(+date);
  }

  private clearOffDays(): void {
    this.daysOff.value.length = 0;
    this.deductions.reset();
  }

  private addOffDayWithCheck(date: Date): void {
    const index = this.findDate(date);
    if (index === -1) this.addOffDay(date);
  }

  private removeOffDayWithCheck(date: Date): void {
    const index = this.findDate(date);
    if (index !== -1) this.removeOffDayAt(index);
  }

  private addOffDay(date: Date) {
    this.daysOff.value.push(date);
    this.recalculateDeductions();
  }

  private removeOffDayAt(index: number) {
    this.daysOff.value.splice(index, 1);
    this.recalculateDeductions();
  }

  private _recalculateAmount(): void {
    const totalCopiesValue = this.totalCopies.value;
    const copies =
      totalCopiesValue || (totalCopiesValue === 0 ? 0 : this.calculatedCopies);
    this.amount.setValue(this.price.value * copies);
  }

  private defaultToOne(n: number): number {
    return n || (n === 0 ? 0 : 1);
  }
}
