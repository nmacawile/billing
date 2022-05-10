import { SheetBuilder } from './sheet-builder';
import { DateHelpers } from '../lib/date-helpers';
import { Period, PeriodParams } from '../models/period';
import {
  PeriodDepartment,
  PeriodDepartmentParams,
} from '../models/period-department';
import {
  PeriodDepartmentItem,
  PeriodDepartmentItemParams,
} from '../models/period-department-item';

export class BIRSheetBuilder extends SheetBuilder {
  protected writeIndex = 14;

  build(): void {
    this.setCoverage();
    this.setClientInfo();
    this.writeItems();
    this.writeFooters();
  }

  protected setClientInfo(): void {
    this.writeToCell('A9', this.billing.client_name);
    this.writeToCell('A10', this.billing.client_address);
  }

  protected setCoverage(): void {
    const startDate = DateHelpers.format(this.billing.start_date);
    const endDate = DateHelpers.format(this.billing.end_date);
    this.writeToCell('A8', startDate + ' to ' + endDate);
  }

  protected writePeriodHeader(p: Period | PeriodParams): void {
    if (this.writeIndex > 14) this.writeIndex++;

    const address = 'A' + this.writeIndex;
    const title =
      DateHelpers.format2(p.start_date) +
      ' TO ' +
      DateHelpers.format2(p.end_date);
    const cell = this.ws.getCell(address);
    this.cloneStyle(cell);
    cell.font.bold = true;
    cell.font.underline = true;
    cell.value = title;
    this.writeIndex++;
  }

  protected writeDepartmentHeader(
    d: PeriodDepartment | PeriodDepartmentParams,
  ) {
    const address = 'A' + this.writeIndex;
    const cell = this.ws.getCell(address);
    this.cloneStyle(cell);
    cell.font.bold = true;
    cell.font.italic = true;
    cell.alignment.indent = 2;
    cell.value = d.name;
    this.writeIndex++;
  }

  protected writeItem(
    i: PeriodDepartmentItem | PeriodDepartmentItemParams,
  ): void {
    const cell = this.ws.getCell('A' + this.writeIndex);
    const qty = i.quantity || (i.quantity === 0 ? 0 : 1);
    this.writeToCell('A' + this.writeIndex, i.name.toUpperCase());
    this.writeToCell('B' + this.writeIndex, +i.total_copies);
    this.writeToCell('C' + this.writeIndex, +i.price);
    this.writeToCell('D' + this.writeIndex, +i.amount);
    this.cloneStyle(cell);
    cell.alignment.indent = 4;
    this.writeIndex++;
  }

  protected writeFooters(): void {
    this.underlineLastItemCell();
    this.writeTotal();
    this.writeRepresentativeLabel();    
  }

  private underlineLastItemCell(): void {
    const lastCell = this.ws.getCell('D' + (this.writeIndex - 1));
    this.cloneStyle(lastCell);
    lastCell.style.border = { bottom: { style: 'thin' } };
  }

  private writeTotal(): void {  
    const totalLabelCell = this.ws.getCell('C' + (this.writeIndex + 1));
    totalLabelCell.value = 'Total AMT Php';
    this.cloneStyle(totalLabelCell);
    totalLabelCell.font.bold = true;
    totalLabelCell.alignment = { vertical: 'bottom', horizontal: 'left' };

    const totalAmountCell = this.ws.getCell('D' + (this.writeIndex + 1));
    totalAmountCell.value = this.billing.total;
    this.cloneStyle(totalAmountCell);
    totalAmountCell.style.border = { bottom: { style: 'double' } };
    totalAmountCell.font.bold = true;
  }

  writeRepresentativeLabel(): void {
    const representativeLabelCell = this.ws.getCell(
      'A' + (this.writeIndex + 6),
    );
    representativeLabelCell.value = 'REPRESENTATIVE';
    this.cloneStyle(representativeLabelCell);
    representativeLabelCell.style.border = { top: { style: 'thin' } };
    representativeLabelCell.alignment = {
      vertical: 'top',
      horizontal: 'center',
    };
    representativeLabelCell.font.bold = true;
  }
}
