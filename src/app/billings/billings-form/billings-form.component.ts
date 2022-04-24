import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Template } from '../../models/template';
import { BillingsService } from '../../services/billings.service';
import { FormBuilderService } from '../../services/form-builder.service';
import { BillingFormService } from '../../services/billing-form.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-billings-form',
  templateUrl: './billings-form.component.html',
  styleUrls: ['./billings-form.component.scss'],
  providers: [BillingFormService],
})
export class BillingsFormComponent implements OnInit, OnDestroy {
  billingForm: FormGroup;
  template: Template;
  templateId: string;

  coverageSub: Subscription;

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

    this.billingForm = this.fbs.billingForm({
      template: this.template,
      client_name: client_name,
    });

    this.bfs.setForm(this.billingForm);

    this.coverageSub = this.bfs.coverage$.subscribe((coverage) => {
      this.billingForm.get('start_date')?.setValue(coverage.start_date);
      this.billingForm.get('end_date')?.setValue(coverage.end_date);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.coverageSub.unsubscribe();
  }

  onFormSubmit(): void {
    const billingData = this.billingForm.getRawValue();
    this.billingsService
      .createBilling(billingData)
      .subscribe((res) => this.router.navigate(['billings', res.id]));
  }

  get periodsFormArray(): FormArray {
    return this.billingForm.get('periods') as FormArray;
  }

  get totalFormControl(): FormControl {
    return this.billingForm.get('total') as FormControl;
  }
}
