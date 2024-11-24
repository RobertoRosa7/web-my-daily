import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { nameIdField } from '../../../pages/auth/auth.field.validators';
import { Form } from '../../../pages/auth/auth.form';
import { UniqueNameService } from '../../services/auth/unique-name.service';
import { CommonEnum } from '../../enums/bases/base.enum';

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
      [formControl]="controlName"
      type="text"
      placeholder="ex: fulando@daily"
      class="border-b outline-none pt-2" />
    <mat-hint align="end">{{ controlName.value }}{{ domainSuffix }}</mat-hint>
    <mat-error *ngIf="controlName.getError('pattern')">Somente letras minuscúlas e alpha numérico</mat-error>
    <mat-error *ngIf="controlName.getError('minlength')">Mínimo de 4 letras</mat-error>
    <mat-error *ngIf="controlName.getError('required')">Nome é obrigatório</mat-error>
    <mat-error *ngIf="controlName.getError('uniqueDomainName')">{{ controlName.value }} já em uso</mat-error>
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
  ::ng-deep .mat-mdc-form-field-hint-wrapper {
    padding:0 !important;
  }
  `,
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class NameIdComponent extends Form implements OnInit {
  public domainSuffix = CommonEnum.daily;
  public controlName: FormControl = nameIdField(inject(UniqueNameService));

  @Output()
  public trigger = this.onChange(this.controlName);

  public ngOnInit(): void {
    this.controlName.setValue(this.inputValue);
  }
}
