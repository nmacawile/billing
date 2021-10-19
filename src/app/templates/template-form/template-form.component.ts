import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Template, TemplateParams } from '../../models/template';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit {
  templateForm: FormGroup;
  @Output() formSubmit = new EventEmitter<TemplateParams>();
  @Input('title') title: string;
  @Input('template') template: TemplateParams | Template;
  @Input('submitLabel') submitLabel: string;
  @Input('newRecord') newRecord = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.templateForm = this.fb.group({
      name: [this.template.name, [Validators.required]],
      _format: [this.template._format],
      client_name: [this.template.client_name, [Validators.required]],
      client_address: [this.template.client_address],
    });
  }

  onSubmit(): void {
    console.log(this.templateForm.getRawValue());
    const params: TemplateParams = this.templateForm.getRawValue();
    this.formSubmit.emit(params);
  }
}
