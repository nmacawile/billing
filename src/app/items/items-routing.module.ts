import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemComponent } from './item/item.component';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemsResolver } from './items.resolver';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    children: [
      { path: '', component: ItemsListComponent },
      { path: 'new', component: NewItemComponent },
      {
        path: ':id',
        component: ItemComponent,
        resolve: { item: ItemsResolver },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
