import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { Item, ItemParams } from '../models/item';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private items$: Observable<Item[]>;
  private items: Item[];

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) {
    this.items$ = this.http.get<Item[]>(this.itemsPath()).pipe(
      tap((items) => (this.items = items)),
      shareReplay(1),
    );
  }

  getItems(): Observable<Item[]> {
    return this.items$;
  }

  createItem(item: ItemParams): Observable<Item> {
    return this.http.post<Item>(this.itemsPath(), { item }).pipe(
      tap((i) => this.items.push(i)),
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
    return this.http.patch<void>(this.itemsPath(id), { item }).pipe(
      tap(() => {
        let i = this.items.find((i) => i['_id']['$oid'] === id);
        Object.assign(i, item);
      }),
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
    return this.http.delete<void>(this.itemsPath(id)).pipe(
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
    return this.http.get<Item>(this.itemsPath(id)).pipe(
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
