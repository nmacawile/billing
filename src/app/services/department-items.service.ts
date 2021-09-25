import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { DepartmentItemParams } from '../models/department-item';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentItemsService {
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

  updateDepartmentItem(
    templateId: string,
    departmentId: string,
    id: string,
    department_item: DepartmentItemParams,
  ): Observable<void> {
    return this.http
      .patch<void>(
        this.departmentItemsPath(templateId, departmentId, id),
        { department_item },
        { headers: this.headers },
      )
      .pipe(
        tap(
          () => this.notificationService.notify('Department Item has been saved.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  private departmentItemsPath(
    templateId: string,
    departmentId: string,
    p: string,
  ): string {
    return (
      environment.serverUrl +
      'templates/' +
      templateId +
      '/departments/' +
      departmentId +
      '/department_items/' +
      p
    );
  }
}
