import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { Item, ItemParams } from '../models/item';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
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

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsPath(), {
      headers: this.headers,
    });
  }

  createItem(item: ItemParams): Observable<void> {
    return this.http
      .post<void>(this.itemsPath(), { item }, { headers: this.headers })
      .pipe(
        tap(
          () => this.notificationService.notify('Item has been created.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  editItem(id: string, item: ItemParams): Observable<void> {
    return this.http
      .patch<void>(this.itemsPath(id), { item }, { headers: this.headers })
      .pipe(
        tap(
          () => this.notificationService.notify('Item has been saved.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  deleteItem(id: string): Observable<void> {
    return this.http
      .delete<void>(this.itemsPath(id), {
        headers: this.headers,
      })
      .pipe(
        tap(
          () => this.notificationService.notify('Item has been deleted.'),
          (err) =>
            this.notificationService.notify(
              'Error ' + err.status + ': ' + err.error.message,
            ),
        ),
      );
  }

  getItem(id: string): Observable<Item> {
    return this.http
      .get<Item>(this.itemsPath(id), {
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

  private itemsPath(p: string = ''): string {
    return environment.serverUrl + 'items/' + p;
  }
}
