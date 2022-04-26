import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { BillingFormService } from '../../services/billing-form.service';
import { BillingsService } from '../../services/billings.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  providers: [BillingFormService],
})
export class BillingComponent implements OnInit {
  billingForm: FormGroup;
  id: string;

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
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    this.billingsService
      .updateBilling(this.id, this.billingForm.getRawValue())
      .subscribe();
  }

  get periodsFormArray(): FormArray {
    return this.billingForm.get('periods') as FormArray;
  }

  get startDate(): Date {
    return this.billingForm.get('start_date')?.value;
  }

  get endDate(): Date {
    return this.billingForm.get('end_date')?.value;
  }
}
