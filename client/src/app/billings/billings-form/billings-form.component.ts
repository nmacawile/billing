import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import { Template } from '../../models/template';
import { BillingsService } from '../../services/billings.service';
import { FormBuilderService } from '../../services/form-builder.service';
import { BillingFormService } from '../../services/billing-form.service';
import { FORMATS } from '../../lib/formats';

@Component({
  selector: 'app-billings-form',
  templateUrl: './billings-form.component.html',
  styleUrls: ['./billings-form.component.scss'],
  providers: [BillingFormService],
})
export class BillingsFormComponent implements OnInit {
  billingForm: FormGroup;
  template: Template;
  templateId: string;
  formats = FORMATS;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billingsService: BillingsService,
    private fbs: FormBuilderService,
    private bfs: BillingFormService,
  ) {
    this.template = this.route.snapshot.data.template;
    this.templateId = this.template?._id.$oid;
    const client_name = this.route.snapshot.queryParams.client_name;

    this.billingForm = this.fbs.newBillingForm({
      template: this.template,
      client_name: client_name,
    });

    this.bfs.setForm(this.billingForm);
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    const billingData = this.billingForm.getRawValue();
    this.billingsService
      .createBilling(billingData)
      .subscribe((res) => this.router.navigate(['billings', res.id]));
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
