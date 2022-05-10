import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BillingsComponent } from './billings.component';
import { BillingsListComponent } from './billings-list/billings-list.component';
import { BillingsFormComponent } from './billings-form/billings-form.component';
import { BillingComponent } from './billing/billing.component';
import { TemplatesResolver } from '../resolvers/templates.resolver';
import { TemplateQueryResolver } from '../resolvers/template-query.resolver';
import { ItemsResolver } from '../resolvers/items.resolver';
import { BillingTemplateResolver } from '../resolvers/billing-template.resolver';

const routes: Routes = [
  {
    path: '',
    component: BillingsComponent,
    children: [
      {
        path: '',
        component: BillingsListComponent,
        resolve: { templates: TemplatesResolver },
      },
      {
        path: 'new',
        component: BillingsFormComponent,
        resolve: { template: TemplateQueryResolver, items: ItemsResolver },
      },
      {
        path: ':billing_id',
        component: BillingComponent,
        resolve: {
          items: ItemsResolver,
          combined: BillingTemplateResolver,
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
export class BillingsRoutingModule {}
