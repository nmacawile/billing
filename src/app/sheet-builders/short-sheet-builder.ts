import { Billing, BillingParams } from '../models/billing';
import { SheetBuilder } from './sheet-builder';
import { Workbook } from 'exceljs';
import { DateHelpers } from '../lib/date-helpers';
import { numberToText } from '../lib/number-to-text';
import { Period, PeriodParams } from '../models/period';
import {
  PeriodDepartment,
  PeriodDepartmentParams,
} from '../models/period-department';
import {
  PeriodDepartmentItem,
  PeriodDepartmentItemParams,
} from '../models/period-department-item';

export class ShortSheetBuilder extends SheetBuilder {
  protected writeIndex = 20;

  build(): void {
    this.setClientInfo();
    this.setCoverage();
    this.writeTotal();
    this.writeTotalText();
    this.writeItems();
  }

  protected setClientInfo(): void {
    this.writeToCell('B10', this.billing.client_name);
    this.writeToCell('B11', this.billing.client_address);
  }

  protected setCoverage(): void {
    const startDate = DateHelpers.format(this.billing.start_date);
    const endDate = DateHelpers.format(this.billing.end_date);
    this.writeToCell('C15', startDate + ' to ' + endDate);
  }

  protected writeTotal(): void {
    this.writeToCell('I49', this.total);
  }

  protected writeTotalText(): void {
    this.writeToCell('A50', numberToText(this.total));
  }

  protected writeItems(): void {
    this.billing.periods.forEach((p) => {
      if (this.writePeriods) this.writePeriodHeader(p);
      p.period_departments?.forEach((d) => {
        if (this.writeDepartments) this.writeDepartmentHeader(d);
        d?.period_department_items?.forEach((i) => {
          this.writeItem(i);
        });
      });
    });
  }

  protected writePeriodHeader(p: Period | PeriodParams): void {
    const address = 'A' + this.writeIndex;
    const title =
      DateHelpers.format2(p.start_date) +
      ' TO ' +
      DateHelpers.format2(p.end_date);
    const cell = this.ws.getCell(address);
    this.cloneStyle(cell);
    cell.font.bold = true;
    cell.alignment.indent = 2;
    cell.value = title;
    this.writeIndex++;
  }

  protected writeDepartmentHeader(d: PeriodDepartment | PeriodDepartmentParams) {
    const address = 'A' + this.writeIndex;
    const cell = this.ws.getCell(address);
    this.cloneStyle(cell);
    cell.font.bold = true;
    cell.alignment.indent = 2;
    cell.value = d.name;
    this.writeIndex++;
  }

  protected writeItem(
    i: PeriodDepartmentItem | PeriodDepartmentItemParams,
  ): void {
    const qty = i.quantity || (i.quantity === 0 ? 0 : 1);
    this.writeToCell('A' + this.writeIndex, qty + ' ' + i.name);
    this.writeToCell('D' + this.writeIndex, i.days);
    this.writeToCell('E' + this.writeIndex, +i.total_copies);
    this.writeToCell('G' + this.writeIndex, +i.price);
    this.writeToCell('I' + this.writeIndex, +i.amount);
    this.writeIndex++;
  }

  protected get writePeriods(): boolean {
    return this.billing.periods?.length > 1;
  }

  protected get writeDepartments(): boolean {
    return this.billing.periods.some(
      (p) => p.period_departments && p.period_departments.length > 1,
    );
  }
}
