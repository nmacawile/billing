import { Cell, Workbook, Worksheet } from 'exceljs';
import { Billing, BillingParams } from '../models/billing';
import { Period, PeriodParams } from '../models/period';
import {
  PeriodDepartment,
  PeriodDepartmentParams,
} from '../models/period-department';
import {
  PeriodDepartmentItem,
  PeriodDepartmentItemParams,
} from '../models/period-department-item';

export class SheetBuilder {
  protected ws: Worksheet;
  protected total: number;
  protected writeIndex: number;

  constructor(
    protected wb: Workbook,
    protected billing: Billing | BillingParams,
  ) {
    this.ws = this.wb.getWorksheet('Sheet1');
    this.total = this.billing.total || 0;
  }

  build(): void {}

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

  protected writePeriodHeader(p: Period | PeriodParams): void {}

  protected writeDepartmentHeader(
    d: PeriodDepartment | PeriodDepartmentParams,
  ): void {}

  protected writeItem(
    i: PeriodDepartmentItem | PeriodDepartmentItemParams,
  ): void {}

  protected writeToCell(address: string, value: any): void {
    this.ws.getCell(address).value = value;
  }

  protected cloneStyle(cell: Cell): void {
    cell.style = { ...cell.style };
    cell.font = { ...cell.font };
    cell.alignment = { ...cell.alignment };
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
