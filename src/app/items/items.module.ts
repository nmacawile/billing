import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemsRoutingModule } from './items-routing.module';
import { MaterialModule } from '../material/material.module';
import { ItemsListComponent } from './items-list/items-list.component';

@NgModule({
  declarations: [ItemsComponent, ItemsListComponent],
  imports: [CommonModule, MaterialModule, ItemsRoutingModule],
})
export class ItemsModule {}
