import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Template, TemplateParams } from '../models/template';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
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

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(this.templatesPath(), {
      headers: this.headers,
    });
  }

  createTemplate(template: TemplateParams): Observable<void> {
    return this.http
      .post<void>(this.templatesPath(), { template }, { headers: this.headers })
      .pipe(
        tap(
          () => this.notificationService.notify('Template has been created.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  editTemplate(id: string, template: TemplateParams): Observable<void> {
    return this.http
      .patch<void>(
        this.templatesPath(id),
        { template },
        { headers: this.headers },
      )
      .pipe(
        tap(
          () => this.notificationService.notify('Template has been saved.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  deleteTemplate(id: string): Observable<void> {
    return this.http
      .delete<void>(this.templatesPath(id), {
        headers: this.headers,
      })
      .pipe(
        tap(
          () => this.notificationService.notify('Template has been deleted.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  getTemplate(id: string): Observable<Template> {
    return this.http
      .get<Template>(this.templatesPath(id), {
        headers: this.headers,
      })
      .pipe(
        tap(
          () => {},
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  private templatesPath(p: string = ''): string {
    return environment.serverUrl + 'templates/' + p;
  }
}
