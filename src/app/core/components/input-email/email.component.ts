import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
export class EmailComponent extends Form implements OnInit {
  public controlName = emailField; // field email with validator

  @Output()
  public trigger = this.onChange(this.controlName); // dispatch event on form change

  ngOnInit(): void {
    this.initForm.emit(this.controlName); // start event and add new form controll on form group
  }
}
