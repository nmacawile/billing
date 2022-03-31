import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  billingForm: FormGroup;

  constructor(private route: ActivatedRoute, private fbs: FormBuilderService) {
    const billing = this.route.snapshot.data.combined.billing;
    this.billingForm = this.fbs.billingEditForm(billing);
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    console.log(this.billingForm.getRawValue());
  }

  get periodsFormArray(): FormArray {
    return this.billingForm.get('periods') as FormArray;
  }
}
