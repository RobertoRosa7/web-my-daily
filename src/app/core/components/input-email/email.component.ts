import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { emailField } from '../../../pages/auth/auth.field.validators';
import { Form } from '../../../pages/auth/auth.form';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-input-email',
  template: `<mat-form-field class="flex flex-col w-full" floatLabel="always">
    <label>Email</label>
    <input
      name="email"
      matInput
      [formControl]="controlName"
      type="email"
      placeholder="Insira seu email"
      class="border-b outline-none pt-2" />
    <mat-error *ngIf="controlName.getError('required')">Email é obrigatório</mat-error>
    <mat-error *ngIf="controlName.getError('pattern')">Email é inválid</mat-error>
    <mat-error *ngIf="controlName.getError('email')">Email é inválid</mat-error>
    <button role="button" [hidden]="isHideSubmit" type="submit" matSuffix mat-icon-button>
      <span class="material-symbols-outlined"> action_key </span>
    </button>
  </mat-form-field>`,
  styles: `::ng-deep .mdc-text-field--filled:not(.mdc-text-field--disabled) {
    background-color: transparent !important;
  }
  ::ng-deep .mdc-text-field--no-label .mat-mdc-form-field-infix {
    padding: 0 !important;
  }
  `,
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class EmailComponent extends Form {
  public controlName: FormControl = emailField;

  @Output()
  public trigger = this.onChange(this.controlName);
}
