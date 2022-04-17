import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Billing } from '../models/billing';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class BillingFormService implements OnDestroy {
  private billingForm: FormGroup;
  private formSub: Subscription;
  total$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  setForm(form: FormGroup): void {
    this.billingForm = form;
    this.formSub = this.billingForm.valueChanges
      .pipe(debounceTime(200))
      .subscribe((billing) => this.calculate(billing));
  }

  private calculate(billing: Billing): void {
    var total = 0;
    (this.billingForm.getRawValue() as Billing).periods.forEach((period) =>
      period.period_departments?.forEach((dept) =>
        dept.period_department_items?.forEach((dept_item) => {
          if (dept_item.amount) total += dept_item.amount;
        }),
      ),
    );
    this.total$.next(total);
  }
}
