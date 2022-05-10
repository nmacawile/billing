import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../services/items.service';
import { Item, ItemParams } from '../../models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  title: string = '';
  item: Item;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private itemsService: ItemsService,
  ) {
    this.item = this.route.snapshot.data.item;
    this.title = this.item.name;
    this.id = this.item['_id']['$oid'];
  }

  ngOnInit(): void {}

  saveItem(itemParams: ItemParams): void {
    this.itemsService
      .editItem(this.id, itemParams)
      .subscribe(() => (this.title = itemParams.name));
  }
}
