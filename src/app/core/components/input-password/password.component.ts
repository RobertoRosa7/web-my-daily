import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { passwordField } from '../../../pages/auth/auth.field.validators';
import { Form } from '../../../pages/auth/auth.form';

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
        [formControl]="controlName"
        [type]="changeTexts ? 'password' : 'text'"
        placeholder="Insira uma senha"
        class="border-b outline-none pt-2" />
      <mat-icon style="cursor: pointer" (click)="changeTexts = !changeTexts" matSuffix>
        {{ changeTexts ? 'visibility_off' : 'visibility' }}
      </mat-icon>
      <mat-error *ngIf="controlName.getError('required')">Senha é obrigatório</mat-error>
      <mat-error *ngIf="controlName.getError('minlength')">Mínimo de 6 digitos</mat-error>
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
  public controlName: FormControl = passwordField;

  @Output()
  public trigger = this.onChange(this.controlName);
}
