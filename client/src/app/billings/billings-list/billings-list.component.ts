import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Template } from '../../models/template';
import { ActivatedRoute, Router } from '@angular/router';
import { Billing } from '../../models/billing';
import { BillingsService } from '../../services/billings.service';
import { SheetsService } from '../../services/sheets.service';
import { SharedService } from '../../shared/shared.service';
import { DateHelpers } from '../../lib/date-helpers';
import { PaginatorService } from '../../services/paginator.service';

const COLUMNS = [
  'template-name',
  'client-name',
  'start-date',
  'end-date',
  'total',
  'actions',
];

@Component({
  selector: 'app-billings-list',
  templateUrl: './billings-list.component.html',
  styleUrls: ['./billings-list.component.scss'],
  providers: [PaginatorService],
})
export class BillingsListComponent implements OnInit, OnDestroy {
  templateControl = new FormControl();
  templates: Template[];
  billings: Billing[];
  filterQuerySub: Subscription;
  filteredTemplates: Observable<Template[]>;

  displayedColumns: string[] = COLUMNS;

  constructor(
    private billingsService: BillingsService,
    private route: ActivatedRoute,
    private router: Router,
    private sheetsService: SheetsService,
    private sharedService: SharedService,
    private paginatorService: PaginatorService,
  ) {
    this.templates = this.route.snapshot.data.templates;
  }

  ngOnInit(): void {
    this.filteredTemplates = this.templateControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.templates.slice())),
    );

    this.filterQuerySub = combineLatest(
      this.templateControl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        tap(() => this.paginatorService.resetToFirstPage()),
      ),
      this.paginatorService.page$.pipe(startWith(1)),
    )
      .pipe(
        debounceTime(200),
        switchMap(([_, page]) => {
          return this.billingsService.getBillings({
            ...this.queryParams(),
            page,
          });
        }),
      )
      .subscribe((d) => {
        this.billings = d.billings;
        this.paginatorService.pages = d.pages;
      });
  }

  ngOnDestroy(): void {
    this.filterQuerySub.unsubscribe();
  }

  newBilling(): void {
    this.router.navigate(['new'], {
      relativeTo: this.route,
      queryParams: this.queryParams(),
    });
  }

  displayFn(template: Template): string {
    return template && template.name ? template.name : '';
  }

  queryParams(): any {
    const val: Template | string = this.templateControl.value;
    return typeof val === 'string'
      ? { client_name: val }
      : { template: val?._id.$oid };
  }

  delete(billing: Billing, index: number): void {
    const id = billing._id.$oid;
    const coverage = `${DateHelpers.format2(
      billing.start_date,
    )} to ${DateHelpers.format2(billing.end_date)}`;
    this.sharedService
      .confirmDeleteDialog(`${billing.client_name} ${coverage}`)
      .pipe(switchMap(() => this.billingsService.deleteBilling(id)))
      .subscribe((res) => {
        this.billings.splice(index, 1);
        this.billings = [...this.billings];
      });
  }

  downloadSheet(billing: Billing): void {
    const templateName = this.templateName(billing.template_id);
    this.sheetsService.download(billing, templateName);
  }

  templateName(templateId: any): any {
    const id = templateId?.['$oid'];
    const template = this.templates.find((t) => t['_id']['$oid'] === id);
    return template?.name;
  }

  private _filter(name: string): Template[] {
    const filterValue = name.toLowerCase();

    return this.templates.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }
}
