import { Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Billing } from '../models/billing';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class BillingFormService implements OnDestroy {
  private billingForm: FormGroup;
  private formSub: Subscription;
  coverage$: BehaviorSubject<{ start_date?: Date; end_date?: Date }> =
    new BehaviorSubject({});

  constructor() {}

  ngOnDestroy(): void {
    this.formSub?.unsubscribe();
  }

  setForm(form: FormGroup): void {
    this.billingForm = form;
    this.formSub = this.billingForm.valueChanges
      .pipe(debounceTime(200))
      .subscribe((billing) => {
        this.calculateTotal(billing);
        this.getCoverage(billing);
      });
  }

  private getCoverage(billing: Billing): void {
    const startDates = billing.periods?.map(period => period.start_date).filter(d => d);
    const endDates = billing.periods?.map(period => period.end_date).filter(d => d);
    const start_date = startDates.sort((a, b) => +a - +b)[0]
    const end_date = endDates.sort((a, b) => +b - +a)[0]
    this.coverage$.next({ start_date, end_date });
  }

  private calculateTotal(billing: Billing): void {
    var total = 0;
    (this.billingForm.getRawValue() as Billing).periods.forEach((period) =>
      period.period_departments?.forEach((dept) =>
        dept.period_department_items?.forEach((dept_item) => {
          if (dept_item.amount) total += dept_item.amount;
        }),
      ),
    );
    this.billingForm.get('total')?.setValue(total, { emitEvent: false });
  }
}
