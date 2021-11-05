import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Template } from '../../models/template';
import { BillingsService } from '../../services/billings.service';

@Component({
  selector: 'app-billings-form',
  templateUrl: './billings-form.component.html',
  styleUrls: ['./billings-form.component.scss'],
})
export class BillingsFormComponent implements OnInit {
  billingForm: FormGroup;
  template: Template;
  templateId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private billingsService: BillingsService,
  ) {}

  ngOnInit(): void {
    this.template = this.route.snapshot.data.template;
    this.templateId = this.template?._id.$oid;

    this.billingForm = this.fb.group({
      template: [{ value: this.templateId, disabled: true }],
      client_name:
        this.template?.client_name ||
        this.route.snapshot.queryParams.client_name,
      client_address: this.template?.client_address,
      start_date: '',
      end_date: '',
      periods: this.fb.array([]),
    });
  }

  onFormSubmit(): void {
    const billingData = this.billingForm.getRawValue();
    //this.billingsService.createBilling(billingData).subscribe();
    console.log(billingData)
  }

  get periodsFormArray(): FormArray {
    return this.billingForm.get('periods') as FormArray;
  }
}
