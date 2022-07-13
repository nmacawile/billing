import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BillingFormService } from '../../services/billing-form.service';
import { SheetsService } from '../../services/sheets.service';
import { Billing } from '../../models/billing';
import { Template } from '../../models/template';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss'],
})
export class StickyFooterComponent implements OnInit {
  totalFormControl: FormControl;
  template: Template;

  constructor(
    private bfs: BillingFormService,
    private sheetsService: SheetsService,
    private route: ActivatedRoute,
  ) {
    this.totalFormControl = this.bfs.totalFormControl;
    this.template =
      this.route.snapshot.data.template ||
      this.route.snapshot.data.combined?.template;
  }

  ngOnInit(): void {}

  downloadSheet(): void {
    const templateName = this.template?.name;
    this.sheetsService.download(
      this.bfs.billingForm.getRawValue(),
      templateName,
    );
  }
}
