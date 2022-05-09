import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Billing, BillingParams } from '../models/billing';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillingsService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {}

  getBilling(id: string): Observable<Billing> {
    return this.http
      .get<Billing>(this.billingsPath(id))
      .pipe(map(this.parseBillingFields));
  }

  getBillings(): Observable<Billing[]> {
    return this.http
      .get<Billing[]>(this.billingsPath())
      .pipe(map((billings) => billings.map(this.parseBillingFields)));
  }

  createBilling(periodic_billing: BillingParams): Observable<{ id: string }> {
    return this.http
      .post<{ id: string }>(this.billingsPath(), { periodic_billing })
      .pipe(
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
    return this.http.delete<void>(this.billingsPath(id)).pipe(
      tap(
        () => this.notificationService.notify('Billing has been deleted.'),
        (err) =>
          this.notificationService.notify(
            'Error ' + err.status + ': ' + err.error.message,
          ),
      ),
    );
  }

  updateBilling(id: string, periodic_billing: BillingParams): Observable<void> {
    return this.http
      .patch<void>(this.billingsPath(id), { periodic_billing })
      .pipe(
        tap(
          () => this.notificationService.notify('Billing has been updated.'),
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

  private parsePeriodTimestamps = (p: any) =>
    Object.assign(p, {
      start_date: new Date(p.start_date),
      end_date: new Date(p.end_date),
    });

  private parseBillingFields = (b: any) =>
    Object.assign(b, {
      start_date: new Date(b.start_date),
      end_date: new Date(b.end_date),
      periods: b.periods.map(this.parsePeriodTimestamps),
      total: +b.total,
    });
}
