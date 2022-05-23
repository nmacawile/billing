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
  periodDepartments: FormArray;

  constructor(private periodService: PeriodService) {}

  ngOnInit(): void {
    this.periodService.periodForm = this.period;
    this.periodDepartments = this.periodService.periodDepartments;
  }
}
