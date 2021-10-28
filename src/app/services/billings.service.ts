import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Billing, BillingParams } from '../models/billing';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BillingsService {
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    });
  }

  getBillings(): Observable<Billing[]> {
    return this.http.get<Billing[]>(this.billingsPath(), {
      headers: this.headers,
    });
  }

  createBilling(periodic_billing: BillingParams): Observable<void> {
    return this.http
      .post<void>(
        this.billingsPath(),
        { periodic_billing },
        { headers: this.headers },
      )
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

  private billingsPath(p: string = ''): string {
    return environment.serverUrl + 'periodic_billings/' + p;
  }
}
