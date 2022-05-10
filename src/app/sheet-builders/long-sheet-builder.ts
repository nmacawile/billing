import { ShortSheetBuilder } from './short-sheet-builder';
import { numberToText } from '../lib/number-to-text';

export class LongSheetBuilder extends ShortSheetBuilder {
  protected writeTotal(): void {
    this.writeToCell('I60', this.total);
  }

  protected writeTotalText(): void {
    this.writeToCell('A61', numberToText(this.total));
  }
}
