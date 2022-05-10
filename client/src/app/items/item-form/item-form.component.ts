import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, ItemParams } from '../../models/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<ItemParams>();
  @Input('title') title: string;
  @Input('submitLabel') submitLabel: string;
  @Input('item') item: ItemParams = {
    name: '',
    price: 20,
    _item_type: 'broadsheet',
  };

  itemForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: [this.item.name, [Validators.required]],
      price: [this.item.price, [Validators.required]],
      _item_type: [this.item._item_type],
    });
  }

  onSubmit(): void {
    const params: ItemParams = this.itemForm.getRawValue();
    this.formSubmit.emit(params);
  }
}
