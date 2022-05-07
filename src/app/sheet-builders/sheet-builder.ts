import { Cell, Workbook, Worksheet } from 'exceljs';
import { Billing, BillingParams } from '../models/billing';

export class SheetBuilder {
  protected ws: Worksheet;
  protected total: number;

  constructor(
    protected wb: Workbook,
    protected billing: Billing | BillingParams,
  ) {
    this.ws = this.wb.getWorksheet('Sheet1');
    this.total = this.billing.total || 0;
  }

  build(): void {}

  protected writeToCell(address: string, value: any): void {
    this.ws.getCell(address).value = value;
  }

  protected cloneStyle(cell: Cell): void {
    cell.style = { ...cell.style };
    cell.font = { ...cell.font };
    cell.alignment = { ...cell.alignment };
  }
}
