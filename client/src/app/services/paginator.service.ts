import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable()
export class PaginatorService {
  pageControl: FormControl = new FormControl(1, { updateOn: 'blur' });
  private _pages: number = 1;

  constructor() {}

  get firstPage(): boolean {
    return this.currentPage <= 1;
  }

  get lastPage(): boolean {
    return this.currentPage >= this.pages;
  }

  get currentPage(): number {
    return +this.pageControl.value;
  }

  get pages(): number {
    return this._pages;
  }

  set pages(p: number) {
    this._pages = p;
    if (this.currentPage === 0 && p > 0) {
      this.pageControl.setValue(1, { emitEvent: false });
    } else if (this.currentPage === 1 && p === 0) {
      this.pageControl.setValue(0, { emitEvent: false });
    }
  }

  resetToFirstPage(): void {
    this.pageControl.setValue(1);
  }

  previousPage(): void {
    this.pageControl.setValue(this.currentPage - 1);
  }

  nextPage(): void {
    this.pageControl.setValue(this.currentPage + 1);
  }

  get page$(): Observable<number> {
    return this.pageControl.valueChanges.pipe(
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
      distinctUntilChanged(),
    );
  }
}
