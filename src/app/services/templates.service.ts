import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Template, TemplateParams } from '../models/template';
import { tap } from 'rxjs/operators';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {}

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(this.templatesPath());
  }

  createTemplate(template: TemplateParams): Observable<void> {
    return this.http.post<void>(this.templatesPath(), { template }).pipe(
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
    return this.http.patch<void>(this.templatesPath(id), { template }).pipe(
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
    return this.http.delete<void>(this.templatesPath(id)).pipe(
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
    return this.http.get<Template>(this.templatesPath(id)).pipe(
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
