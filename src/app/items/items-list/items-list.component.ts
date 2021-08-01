import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { SharedService } from '../../shared/shared.service';
import { switchMap } from 'rxjs/operators';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {
  items: Item[] = [];
  displayedColumns: string[] = ['name', 'price', '_item_type', 'delete'];

  @ViewChild(MatTable) table: MatTable<Item>;

  constructor(
    private itemsService: ItemsService,
    private sharedService: SharedService,
  ) {
    this.itemsService.getItems().subscribe((items) => (this.items = items));
  }

  ngOnInit(): void {}

  deleteItem(item: Item, index: number): void {
    console.log(index);
    this.sharedService
      .confirmDeleteDialog(item.name)
      .pipe(switchMap(() => this.itemsService.deleteItem(this.getId(item))))
      .subscribe(() => {
        this.items.splice(index, 1);
        this.table.renderRows();
      });
  }

  getId(item: Item): string {
    return item['_id']['$oid'];
  }
}
