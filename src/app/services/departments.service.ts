import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Template } from '../models/template';
import { DepartmentParams } from '../models/department';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
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

  updateDepartment(
    templateId: string,
    id: string,
    department: DepartmentParams,
  ): Observable<void> {
    return this.http
      .patch<void>(
        this.departmentsPath(templateId, id),
        { department },
        { headers: this.headers },
      )
      .pipe(
        tap(
          () => this.notificationService.notify('Department has been saved.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  createDepartment(
    templateId: string,
    department: DepartmentParams,
  ): Observable<{ id: string }> {
    return this.http
      .post<{ id: string }>(
        this.departmentsPath(templateId),
        { department },
        { headers: this.headers },
      )
      .pipe(
        tap(
          () => this.notificationService.notify('Department has been created.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  private departmentsPath(templateId: string, p: string = ''): string {
    return (
      environment.serverUrl + 'templates/' + templateId + '/departments/' + p
    );
  }
}
