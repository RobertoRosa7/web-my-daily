import { CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { nameIdField } from '../../../auth.field.validators';
import { Form } from '../../../auth.form';
import { UniqueNameService } from '../../services/unique-name.service';
import { Common } from '../../../../../core/enums/bases/base.enum';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-input-name-id',
  template: ` <mat-form-field class="flex flex-col w-full" floatLabel="always">
    <label>Nome de Domínio</label>
    <input
      matInput
      required
      [formControl]="nameId"
      type="text"
      placeholder="ex: fulando@daily"
      class="border-b outline-none pt-2" />
    <mat-hint align="end">{{ getNameId }}{{ domainSuffix }}</mat-hint>
    <mat-error *ngIf="nameId.getError('pattern')">Somente letras minuscúlas e alpha numérico</mat-error>
    <mat-error *ngIf="nameId.getError('minlength')">Mínimo de 4 letras</mat-error>
    <mat-error *ngIf="nameId.getError('required')">Nome é obrigatório</mat-error>
    <mat-error *ngIf="nameId.getError('uniqueDomainName')">{{ getNameId }} já em uso</mat-error>
  </mat-form-field>`,
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
  public domainSuffix = Common.daily;
  public nameId: FormControl = nameIdField(inject(UniqueNameService));

  @Output()
  public trigger = this.onChange(this.nameId);

  public get getNameId() {
    return this.nameId.value;
  }
}
