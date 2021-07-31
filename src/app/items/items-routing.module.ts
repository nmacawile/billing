import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ItemsListComponent } from './items-list/items-list.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsComponent,
    children: [{ path: '', component: ItemsListComponent }],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule {}
