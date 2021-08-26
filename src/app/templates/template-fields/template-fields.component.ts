import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Template, TemplateParams } from '../../models/template';
import { TemplatesService } from '../../services/templates.service';

@Component({
  selector: 'app-template-fields',
  templateUrl: './template-fields.component.html',
  styleUrls: ['./template-fields.component.scss'],
})
export class TemplateFieldsComponent implements OnInit {
  template: Template;
  id: string;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private templatesService: TemplatesService,
  ) {
    this.template = this.route.parent?.snapshot.data.template;
    this.title = this.template.name;
    this.id = this.template['_id']['$oid'];
  }

  ngOnInit(): void {}

  saveTemplate(templateParams: TemplateParams): void {
    this.templatesService
      .editTemplate(this.id, templateParams)
      .subscribe(() => (this.title = templateParams.name));
  }
}
