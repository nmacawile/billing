import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Template } from '../../models/template';
import { TemplatesService } from '../../services/templates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Billing } from '../../models/billing';
import { BillingsService } from '../../services/billings.service';
import { SheetsService } from '../../services/sheets.service';
import { SharedService } from '../../shared/shared.service';
import { DateHelpers } from '../../lib/date-helpers';

@Component({
  selector: 'app-billings-list',
  templateUrl: './billings-list.component.html',
  styleUrls: ['./billings-list.component.scss'],
})
export class BillingsListComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  templates: Template[];
  billings: Billing[];
  pageControl: FormControl = new FormControl(1, { updateOn: 'blur' });
  pages: number;
  pageSub: Subscription;
  filteredTemplates: Observable<Template[]>;

  displayedColumns: string[] = [
    'template-name',
    'client-name',
    'start-date',
    'end-date',
    'total',
    'actions',
    'actions-compact',
  ];

  constructor(
    private templatesService: TemplatesService,
    private billingsService: BillingsService,
    private route: ActivatedRoute,
    private router: Router,
    private sheetsService: SheetsService,
    private sharedService: SharedService,
  ) {
    this.templates = this.route.snapshot.data.templates;
  }

  ngOnInit(): void {
    this.billingsService.getBillings().subscribe((data) => {
      this.billings = data.billings;
      this.pages = data.pages;
    });
    this.filteredTemplates = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.templates.slice())),
    );
    this.pageSub = this.page$
      .pipe(
        distinctUntilChanged(),
        switchMap((page) => this.billingsService.getBillings(page)),
      )
      .subscribe((data) => {
        this.billings = data.billings;
        this.pages = data.pages;
      });
  }

  ngOnDestroy(): void {
    this.pageSub.unsubscribe();
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
    this.sheetsService.download(billing);
  }

  templateName(templateId: any): any {
    const id = templateId && templateId['$oid'];
    const template = this.templates.find((t) => t['_id']['$oid'] === id);
    return template?.name || 'Blank template';
  }

  get firstPage(): boolean {
    return this.currentPage <= 1;
  }

  get lastPage(): boolean {
    return this.currentPage >= this.pages;
  }

  get currentPage(): number {
    return +this.pageControl.value;
  }

  previousPage(): void {
    this.pageControl.setValue(this.currentPage - 1);
  }

  nextPage(): void {
    this.pageControl.setValue(this.currentPage + 1);
  }

  private get page$(): Observable<number> {
    return this.pageControl.valueChanges.pipe(
      debounceTime(200),
      map((v) => {
        let _v = v;
        if (isNaN(v) || v < 1) {
          this.pageControl.setValue(1, { emitEvent: false });
          _v = 1;
        } else if (v > this.pages) {
          this.pageControl.setValue(this.pages, { emitEvent: false });
          _v = this.pages;
        }
        return +_v;
      }),
    );
  }

  private _filter(name: string): Template[] {
    const filterValue = name.toLowerCase();

    return this.templates.filter((option) =>
      option.name.toLowerCase().includes(filterValue),
    );
  }
}
