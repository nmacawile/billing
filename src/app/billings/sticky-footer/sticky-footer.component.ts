import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BillingFormService } from '../../services/billing-form.service';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss'],
})
export class StickyFooterComponent implements OnInit {
  totalFormControl: FormControl;

  constructor(private bfs: BillingFormService) {
    this.totalFormControl = this.bfs.totalFormControl;
  }

  ngOnInit(): void {}
}
