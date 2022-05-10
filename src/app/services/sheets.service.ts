import { Injectable } from '@angular/core';
import { Billing, BillingParams } from '../models/billing';
import { Workbook } from 'exceljs';
import { SheetBuilder } from '../sheet-builders/sheet-builder';
import { ShortSheetBuilder } from '../sheet-builders/short-sheet-builder';
import { LongSheetBuilder } from '../sheet-builders/long-sheet-builder';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SheetsService {
  constructor(private httpClient: HttpClient) {}

  download(billing: Billing | BillingParams): void {
    const format = billing._format || 'short';
    this.loadSheet(format).subscribe((wb: Workbook) => {
      this.build(wb, billing, format);
      this.saveFile(wb);
    });
  }

  private async saveFile(wb: Workbook): Promise<void> {
    const buff = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buff]), 'test.xlsx');
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
