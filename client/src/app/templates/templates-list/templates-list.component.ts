import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../models/template';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss'],
})
export class TemplatesListComponent implements OnInit {
  templates: Template[] = [];

  constructor(
    private templatesService: TemplatesService,
    private sharedService: SharedService,
  ) {
    this.templatesService
      .getTemplates()
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnInit(): void {}

  deleteTemplate(template: Template, index: number): void {
    const id = this.getId(template);
    const title = `${template.client_name} (${template.name})`;
    this.sharedService
      .confirmDeleteDialog(title)
      .pipe(switchMap(() => this.templatesService.deleteTemplate(id)))
      .subscribe(() => {
        this.templates.splice(index, 1);
      });
  }

  getId(template: Template): string {
    return template['_id']['$oid'];
  }
}
