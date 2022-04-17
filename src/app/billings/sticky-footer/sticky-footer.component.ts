import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss'],
})
export class StickyFooterComponent implements OnInit {
  @Input('total$') total$: BehaviorSubject<number>;

  constructor() {}

  ngOnInit(): void {}
}
