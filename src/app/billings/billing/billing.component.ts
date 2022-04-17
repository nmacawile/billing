import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { BillingFormService } from '../../services/billing-form.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
  providers: [BillingFormService],
})
export class BillingComponent implements OnInit {
  billingForm: FormGroup;
  total$: BehaviorSubject<number>;

  constructor(
    private route: ActivatedRoute,
    private fbs: FormBuilderService,
    private bfs: BillingFormService,
  ) {
    const billing = this.route.snapshot.data.combined.billing;
    this.billingForm = this.fbs.billingEditForm(billing);

    this.bfs.setForm(this.billingForm);
    this.total$ = this.bfs.total$;
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    console.log(this.billingForm.getRawValue());
  }

  get periodsFormArray(): FormArray {
    return this.billingForm.get('periods') as FormArray;
  }
}
