import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private dialog: MatDialog) {}

  confirmDeleteDialog(title: string): Observable<true> {
    const dialogRef: MatDialogRef<ConfirmDeleteComponent> = this.dialog.open(
      ConfirmDeleteComponent,
      { data: title },
    );
    return dialogRef.afterClosed().pipe(filter((c) => c)) as Observable<true>;
  }
}
