import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemsRoutingModule } from './items-routing.module';
import { MaterialModule } from '../material/material.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemComponent } from './item/item.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsListComponent,
    ItemComponent,
    NewItemComponent,
    ItemFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ItemsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ItemsModule {}
