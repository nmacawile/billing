import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item';
import { ItemsService } from '../services/items.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsResolver implements Resolve<Item> {
  constructor(private itemsService: ItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Item> {
    const itemId: string = route.params.id;
    return this.itemsService.getItem(itemId);
  }
}
