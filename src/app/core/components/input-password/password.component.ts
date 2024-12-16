import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
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
        name="password"
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
      <mat-error *ngIf="controlName.getError('pattern')">
        A senha deve conter letras, números e caracteres especiais
      </mat-error>
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
export class PasswordComponent extends Form implements OnInit {
  public changeTexts = true; // change text or password
  public controlName: FormControl = passwordField; // form controll password

  @Output()
  public trigger = this.onChange(this.controlName); // dispatch event on form change

  public ngOnInit(): void {
    this.initForm.emit(this.controlName); // start event and add new form controll on form group
  }
}
