import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { MaterialModule } from '../material/material.module';
import { NewTemplateComponent } from './new-template/new-template.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form/template-form.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { SharedModule } from '../shared/shared.module';
import { TemplateFieldsComponent } from './template-fields/template-fields.component';
import { DepartmentsModule } from '../departments/departments.module';

@NgModule({
  declarations: [
    TemplatesComponent,
    TemplatesListComponent,
    NewTemplateComponent,
    TemplateFormComponent,
    EditTemplateComponent,
    TemplateFieldsComponent,
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DepartmentsModule,
  ],
})
export class TemplatesModule {}
