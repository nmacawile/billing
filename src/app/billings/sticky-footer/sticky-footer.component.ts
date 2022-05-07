import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BillingFormService } from '../../services/billing-form.service';
import { SheetsService } from '../../services/sheets.service';
import { Billing } from '../../models/billing';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss'],
})
export class StickyFooterComponent implements OnInit {
  totalFormControl: FormControl;

  constructor(
    private bfs: BillingFormService,
    private sheetsService: SheetsService,
  ) {
    this.totalFormControl = this.bfs.totalFormControl;
  }

  ngOnInit(): void {}

  downloadSheet(): void {
    this.sheetsService.download(this.bfs.billingForm.getRawValue());
  }
}
