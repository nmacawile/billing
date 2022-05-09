import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Template } from '../../models/template';
import { TemplatesService } from '../../services/templates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Billing } from '../../models/billing';
import { BillingsService } from '../../services/billings.service';
import { SheetsService } from '../../services/sheets.service';

@Component({
  selector: 'app-billings-list',
  templateUrl: './billings-list.component.html',
  styleUrls: ['./billings-list.component.scss'],
})
export class BillingsListComponent implements OnInit {
  myControl = new FormControl();
  templates: Template[];
  billings: Billing[];
  filteredTemplates: Observable<Template[]>;

  constructor(
    private templatesService: TemplatesService,
    private billingsService: BillingsService,
    private route: ActivatedRoute,
    private router: Router,
    private sheetsService: SheetsService,
  ) {
    this.templates = this.route.snapshot.data.templates;
  }

  ngOnInit(): void {
    this.billingsService
      .getBillings()
      .subscribe((billings) => (this.billings = billings));
    this.filteredTemplates = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.templates.slice())),
    );
  }

  onSubmit(): void {
    this.router.navigate(['new'], {
      relativeTo: this.route,
      queryParams: this.queryParams(),
    });
  }

  displayFn(user: Template): string {
    return user && user.name ? user.name : '';
  }

  queryParams(): any {
    const val: Template | string = this.myControl.value;
    return typeof val === 'string'
      ? { client_name: val }
      : { template: val?._id.$oid };
  }

  delete(id: string, index: number): void {
    this.billingsService
      .deleteBilling(id)
      .subscribe((res) => this.billings.splice(index, 1));
  }

  downloadSheet(billing: Billing): void {
    this.sheetsService.download(billing);
  }

  private _filter(name: string): Template[] {
    const filterValue = name.toLowerCase();

    return this.templates.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }
}
