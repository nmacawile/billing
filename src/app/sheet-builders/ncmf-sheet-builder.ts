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
