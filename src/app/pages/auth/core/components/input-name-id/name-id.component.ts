import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { nameIdField } from '../../../auth.field.validators';
import { Form } from '../../../auth.form';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-input-name-id',
  template: `<mat-form-field class="flex flex-col w-full" floatLabel="always">
    <label>NameId</label>
    <input
      matInput
      required
      [formControl]="nameId"
      type="text"
      placeholder="Insira seu nameId (nome de domínio)"
      class="border-b outline-none pt-2" />
    <mat-hint matSuffix>{{ domainSuffix }}</mat-hint>
    <mat-hint align="end">{{ getNameId }}{{ domainSuffix }}</mat-hint></mat-form-field
  >`,
  styles: `::ng-deep .mdc-text-field--filled:not(.mdc-text-field--disabled) {
    background-color: transparent !important;
  }
  ::ng-deep .mdc-text-field--no-label .mat-mdc-form-field-infix {
    padding: 0 !important;
  }
  ::ng-deep .mat-mdc-form-field-hint-wrapper {
    padding:0 !important;
  }
  `,
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class NameIdComponent extends Form {
  public domainSuffix = '@daily';
  public nameId: FormControl = nameIdField;

  @Output()
  public trigger = this.onChange(this.nameId);

  public get getNameId() {
    return this.nameId.value;
  }
}
