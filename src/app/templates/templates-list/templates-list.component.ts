import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { Template } from '../../models/template';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTemplateDeleteDialogComponent } from '../confirm-template-delete-dialog/confirm-template-delete-dialog.component';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss'],
})
export class TemplatesListComponent implements OnInit {
  templates: Template[] = [];

  constructor(
    private templatesService: TemplatesService,
    private dialog: MatDialog,
  ) {
    this.templatesService
      .getTemplates()
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnInit(): void {}

  deleteTemplate(template: Template, index: number): void {
    const id = this.getId(template);
    const dialogRef = this.dialog.open(ConfirmTemplateDeleteDialogComponent, {
      data: template,
    });
    (dialogRef.afterClosed() as Observable<boolean>)
      .pipe(
        filter((c) => c),
        switchMap(() => this.templatesService.deleteTemplate(id)),
      )
      .subscribe(() => {
        this.templates.splice(index, 1);
      });
  }

  getId(template: Template): string {
    return template['_id']['$oid'];
  }
}
