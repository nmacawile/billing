import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  displayedColumns: string[] = ['name', 'price', '_item_type'];

  constructor(private itemsService: ItemsService) {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
  }

  ngOnInit(): void {}
}
