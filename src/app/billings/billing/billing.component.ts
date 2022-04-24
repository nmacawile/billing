import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { BillingFormService } from '../../services/billing-form.service';
import { Subscription } from 'rxjs';
import { BillingsService } from '../../services/billings.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  providers: [BillingFormService],
})
export class BillingComponent implements OnInit, OnDestroy {
  billingForm: FormGroup;
  id: string;

  coverageSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fbs: FormBuilderService,
    private bfs: BillingFormService,
    private billingsService: BillingsService,
  ) {
    const billing = this.route.snapshot.data.combined.billing;
    this.billingForm = this.fbs.billingEditForm(billing);
    this.id = billing._id.$oid;

    this.bfs.setForm(this.billingForm);

    this.coverageSub = this.bfs.coverage$.subscribe(coverage => {
      this.billingForm.get('start_date')?.setValue(coverage.start_date);
      this.billingForm.get('end_date')?.setValue(coverage.end_date);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.coverageSub.unsubscribe();
  }

  onFormSubmit(): void {
    this.billingsService
      .updateBilling(this.id, this.billingForm.getRawValue())
      .subscribe();
  }

  get periodsFormArray(): FormArray {
    return this.billingForm.get('periods') as FormArray;
  }

  get totalFormControl(): FormControl {
    return this.billingForm.get('total') as FormControl;
  }
}
