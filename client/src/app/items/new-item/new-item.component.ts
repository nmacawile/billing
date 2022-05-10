import { Component, OnInit } from '@angular/core';
import { ItemParams } from '../../models/item';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  constructor(private itemsService: ItemsService, private router: Router) {}

  ngOnInit(): void {}

  createItem(itemParams: ItemParams): void {
    this.itemsService
      .createItem(itemParams)
      .subscribe(() => this.router.navigate(['/items']));
  }
}
