import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Template } from '../../models/template';

@Component({
  selector: 'app-confirm-template-delete-dialog',
  templateUrl: './confirm-template-delete-dialog.component.html',
  styleUrls: ['./confirm-template-delete-dialog.component.scss'],
})
export class ConfirmTemplateDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public template: Template) {}
}
