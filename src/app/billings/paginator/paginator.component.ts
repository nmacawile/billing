import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaginatorService } from '../../services/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  pageControl: FormControl;

  constructor(public paginatorService: PaginatorService) {}

  ngOnInit(): void {
    this.pageControl = this.paginatorService.pageControl;
  }

  previousPage(): void {
    this.paginatorService.previousPage();
  }

  nextPage(): void {
    this.paginatorService.nextPage();
  }

  blur(e: Event): void {
    const t = e.target as HTMLElement;
    t.blur();
  }

  get firstPage(): boolean {
    return this.paginatorService.firstPage;
  }

  get lastPage(): boolean {
    return this.paginatorService.lastPage;
  }

  get pages(): number {
    return this.paginatorService.pages;
  }
}
