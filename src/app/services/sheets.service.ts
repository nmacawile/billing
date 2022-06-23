import { Injectable } from '@angular/core';
import { Billing, BillingParams } from '../models/billing';
import { Workbook } from 'exceljs';
import { SheetBuilder } from '../sheet-builders/sheet-builder';
import { ShortSheetBuilder } from '../sheet-builders/short-sheet-builder';
import { LongSheetBuilder } from '../sheet-builders/long-sheet-builder';
import { NCMFSheetBuilder } from '../sheet-builders/ncmf-sheet-builder';
import { BIRSheetBuilder } from '../sheet-builders/bir-sheet-builder';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DateHelpers } from '../lib/date-helpers';

@Injectable({
  providedIn: 'root',
})
export class SheetsService {
  constructor(private httpClient: HttpClient) {}

  download(billing: Billing | BillingParams, templateName?: string): void {
    const format = billing._format || 'short';
    this.loadSheet(format).subscribe((wb: Workbook) => {
      this.build(wb, billing, format);
      const name = templateName || billing.client_name;
      const fileName = this.createFileName(billing, name);
      this.saveFile(wb, fileName);
    });
  }

  private createFileName(billing: Billing | BillingParams, name: string): string {
    const startDate = DateHelpers.simpleFormat(billing.start_date);
    const endDate = DateHelpers.simpleFormat(billing.end_date);
    let _fileName = name + '_' + startDate + '_' + endDate;
    return _fileName;
  }

  private async saveFile(wb: Workbook, fileName: string): Promise<void> {
    const buff = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buff]), fileName + '.xlsx');
  }

  private build(
    wb: Workbook,
    billing: Billing | BillingParams,
    format: string,
  ): void {
    let builder: SheetBuilder;
    switch (format) {
      case 'long':
        builder = new LongSheetBuilder(wb, billing);
        break;
      case 'ncmf':
        builder = new NCMFSheetBuilder(wb, billing);
        break;
      case 'bir':
        builder = new BIRSheetBuilder(wb, billing);
        break;
      default:
        builder = new ShortSheetBuilder(wb, billing);
    }
    builder.build();
  }

  private loadSheet(format: string): Observable<Workbook> {
    return this.httpClient
      .get(`assets/formats/${format}.xlsx`, { responseType: 'blob' })
      .pipe(
        switchMap((data: Blob) => data.arrayBuffer()),
        switchMap((buffer) => new Workbook().xlsx.load(buffer)),
      );
  }
}
