import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { nickNameField } from '../../../pages/auth/auth.field.validators';
import { Form } from '../../../pages/auth/auth.form';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-input-nickname',
  template: `
    <mat-form-field class="flex flex-col w-full" floatLabel="always">
      <label>Apelido</label>
      <input
        minlength="4"
        maxlength="24"
        matInput
        [formControl]="controlName"
        type="text"
        placeholder="Como gostaria de ser chamado(a)"
        class="border-b outline-none pt-2" />
      <mat-error *ngIf="controlName.getError('required')">Apelido é obrigatório</mat-error>
      <mat-error *ngIf="controlName.getError('minlength')">Mínimo de 4 caracteres</mat-error>
      <mat-error *ngIf="controlName.getError('maxlength')">Máximo de 24 caracteres</mat-error>
      <button role="button" [hidden]="isHideSubmit" type="submit" matSuffix mat-icon-button>
        <span class="material-symbols-outlined"> action_key </span>
      </button>
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
export class NickNameComponent extends Form implements OnInit {
  public controlName: FormControl = nickNameField;

  @Output()
  public trigger = this.onChange(this.controlName);

  public ngOnInit(): void {
    this.controlName.setValue(this.inputValue);
  }
}
