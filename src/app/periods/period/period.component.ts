import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { PeriodService } from '../../services/period.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss'],
  providers: [PeriodService],
})
export class PeriodComponent implements OnInit {
  @Input('period') period: FormGroup;

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.periodService.periodForm = this.period;
  }

  get period_departments(): FormArray {
    return this.period.get('period_departments') as FormArray;
  }

  clearDaysOff(): void {
    this.periodService.clearDaysOff();
  }
}
