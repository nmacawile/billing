import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deduction-dialog',
  templateUrl: './deduction-dialog.component.html',
  styleUrls: ['./deduction-dialog.component.scss'],
})
export class DeductionDialogComponent implements OnInit {
  weekdays = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];
  deduction: { [key: number]: number };

  constructor(
    public dialogRef: MatDialogRef<DeductionDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { max: number; deduction: { [key: number]: number }; itemName: string },
  ) {
    this.deduction = { ...data.deduction }
  }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClear(): void {
    this.deduction = {}
  }
}
