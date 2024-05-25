import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-input-search',
  styles: `
  ::ng-deep .mat-mdc-form-field-bottom-align {
    display: none;
  }
  `,
  template: `
    <mat-form-field appearance="fill" class="w-full">
      <mat-icon matPrefix>search</mat-icon>
      <input matInput type="text" placeholder="Pesquisar" />
    </mat-form-field>
  `,
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class InputSearchComponent {}
