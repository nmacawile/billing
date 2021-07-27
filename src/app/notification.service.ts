import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  notify(message: string): void {
    this.snackBar.open(message, 'CLOSE', { duration: 2000 });
  }
}
