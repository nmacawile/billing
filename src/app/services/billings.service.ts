import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Billing, BillingParams } from '../models/billing';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillingsService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {}

  getBilling(id: string): Observable<Billing> {
    return this.http.get<Billing>(this.billingsPath(id));
  }

  getBillings(): Observable<Billing[]> {
    return this.http.get<Billing[]>(this.billingsPath());
  }

  createBilling(periodic_billing: BillingParams): Observable<void> {
    return this.http.post<void>(this.billingsPath(), { periodic_billing }).pipe(
      tap(
        () => this.notificationService.notify('Billing has been created.'),
        (err) =>
          this.notificationService.notify(
            'Error ' + err.status + ': ' + err.error.message,
          ),
      ),
    );
  }

  deleteBilling(id: string): Observable<void> {
    return this.http
      .delete<void>(this.billingsPath(id))
      .pipe(
        tap(
          () =>
            this.notificationService.notify(
              'Billing has been deleted.',
            ),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  private billingsPath(p: string = ''): string {
    return environment.serverUrl + 'periodic_billings/' + p;
  }
}
