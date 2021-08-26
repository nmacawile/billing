import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { MaterialModule } from '../material/material.module';
import { NewTemplateComponent } from './new-template/new-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form/template-form.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { SharedModule } from '../shared/shared.module';
import { TemplateItemsComponent } from './template-items/template-items.component';
import { TemplateFieldsComponent } from './template-fields/template-fields.component';

@NgModule({
  declarations: [
    TemplatesComponent,
    TemplatesListComponent,
    NewTemplateComponent,
    TemplateFormComponent,
    EditTemplateComponent,
    TemplateItemsComponent,
    TemplateFieldsComponent,
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TemplatesModule {}
