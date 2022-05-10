import { LongSheetBuilder } from './long-sheet-builder';
import {
  PeriodDepartment,
  PeriodDepartmentParams,
} from '../models/period-department';
import {
  PeriodDepartmentItem,
  PeriodDepartmentItemParams,
} from '../models/period-department-item';

export class NCMFSheetBuilder extends LongSheetBuilder {
  
  protected writeDepartmentHeader(
    d: PeriodDepartment | PeriodDepartmentParams,
  ) {
    const address = 'A' + this.writeIndex;
    const cell = this.ws.getCell(address);
    cell.value = d.name;
  }

  protected writeItem(
    i: PeriodDepartmentItem | PeriodDepartmentItemParams,
  ): void {
    const qty = i.quantity || (i.quantity === 0 ? 0 : 1);
    this.writeToCell('D' + this.writeIndex, i.name);
    this.writeToCell('F' + this.writeIndex, +i.total_copies);
    this.writeToCell('G' + this.writeIndex, +i.price);
    this.writeToCell('I' + this.writeIndex, +i.amount);
    this.writeIndex++;
  }
}
