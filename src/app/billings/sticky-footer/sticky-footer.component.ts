import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sticky-footer',
  templateUrl: './sticky-footer.component.html',
  styleUrls: ['./sticky-footer.component.scss'],
})
export class StickyFooterComponent implements OnInit {
  @Input('control') control: FormControl;

  constructor() {}

  ngOnInit(): void {}
}
