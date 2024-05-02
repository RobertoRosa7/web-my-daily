import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { passwordField } from '../../../auth.field.validators';
import { Form } from '../../../auth.form';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-input-password',
  template: `
    <mat-form-field class="flex flex-col w-full" floatLabel="always">
      <label>Senha</label>
      <input
        matInput
        [formControl]="password"
        [type]="changeTexts ? 'password' : 'text'"
        placeholder="Insira uma senha"
        class="border-b outline-none pt-2" />
      <mat-icon style="cursor: pointer" (click)="changeTexts = !changeTexts" matSuffix>{{
        changeTexts ? 'visibility_off' : 'visibility'
      }}</mat-icon>
    </mat-form-field>
  `,
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
export class PasswordComponent extends Form {
  public changeTexts = true;
  public password: FormControl = passwordField;

  @Output()
  public trigger = this.onChange(this.password);
}