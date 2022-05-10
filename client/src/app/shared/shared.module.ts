import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ConfirmDeleteComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ConfirmDeleteComponent],
})
export class SharedModule {}
