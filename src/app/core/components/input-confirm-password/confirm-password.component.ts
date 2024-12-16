import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Form } from '../../../pages/auth/auth.form';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-input-confirm-password',
  template: `
    <mat-form-field class="flex flex-col w-full" floatLabel="always">
      <label>Confirme sua Senha</label>
      <input
        name="confirm-password"
        matInput
        required
        [formControl]="controlName"
        [type]="changeTexts ? 'password' : 'text'"
        placeholder="Confirme a senha"
        class="border-b outline-none pt-2" />
      <mat-icon style="cursor: pointer" (click)="changeTexts = !changeTexts" matSuffix>
        {{ changeTexts ? 'visibility_off' : 'visibility' }}
      </mat-icon>
      <mat-error *ngIf="controlName.getError('mustMatch')" class="text-error"> Senhas não são iguais </mat-error>
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
export class ConfirmPasswordComponent extends Form implements OnInit {
  public changeTexts = true; // change text or password

  /**
   * Responsible to match password
   *
   * @param control AbstractControl
   * @returns ValidationErrors | null
   */
  public confirmPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
    return this.password && this.password.value === control.value ? null : { mustMatch: true };
  };

  /**
   * FormControl - input password validator
   */
  public controlName = new FormControl(null, {
    validators: [this.confirmPasswordValidator.bind(this), Validators.required, Validators.minLength(6)],
    updateOn: 'change',
  });

  @Input()
  public password!: AbstractControl | null; // input password formControl

  @Output()
  public trigger = this.onChange(this.controlName); // dispatch event on form change

  ngOnInit(): void {
    this.initForm.emit(this.controlName); // start event and add new form controll on form group
  }
}
