import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Accept', 'application/json');
  }

  get email(): string | null {
    return localStorage.getItem('email');
  }

  isLoggedIn(): boolean {
    return !!(
      localStorage.getItem('authToken') && localStorage.getItem('email')
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post(environment.serverUrl + 'auth/login', credentials, {
        headers: this.headers,
      })
      .pipe(
        tap(
          (credentials: any) => {
            localStorage.setItem('authToken', credentials['auth_token']);
            localStorage.setItem('email', credentials['email']);
            this.notificationService.notify(
              `Logged in as ${credentials['email']}.`,
            );
          },
          (err) => {
            this.notificationService.notify(
              `Error ${err.status}: ${err.error.message}`,
            );
          },
        ),
      );
  }

  logout(message?: string): void {
    this.notificationService.notify(message || 'Logged out.');
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
  }

  register(email: string, password: string): Observable<any> {
    return this.http
      .post(
        environment.serverUrl + 'users',
        {
          user: { email, password },
        },
        {
          headers: this.headers,
        },
      )
      .pipe(
        tap(
          (credentials: any) => {
            this.notificationService.notify(`Registration successful.`);
          },
          (err) => {
            this.notificationService.notify(
              `Error ${err.status}: ${err.error.message}`,
            );
          },
        ),
      );
  }
}
