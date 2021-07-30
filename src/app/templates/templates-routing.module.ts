import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { NewTemplateComponent } from './new-template/new-template.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { TemplatesResolver } from './templates.resolver';

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent,
    children: [
      {
        path: '',
        component: TemplatesListComponent,
      },
      {
        path: 'new',
        component: NewTemplateComponent,
      },
      {
        path: ':id',
        component: EditTemplateComponent,
        resolve: {
          template: TemplatesResolver,
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatesRoutingModule {}
