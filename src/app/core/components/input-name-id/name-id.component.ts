import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { nameIdField } from '../../../pages/auth/auth.field.validators';
import { Form } from '../../../pages/auth/auth.form';
import { UniqueNameService } from '../../services/auth/unique-name.service';
import { CommonEnum } from '../../enums/bases/base.enum';
import { map, startWith } from 'rxjs';
import { toLowerCase } from '@utils/strings/string.util';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-input-name-id',
  template: ` <mat-form-field class="flex flex-col w-full" floatLabel="always">
    <label>Nome de Domínio</label>
    <input
      maxlength="6"
      minlength="4"
      matInput
      required
      [formControl]="controlName"
      type="text"
      placeholder="ex: fulando@daily"
      class="border-b outline-none pt-2" />
    <mat-hint align="end">{{ controlName.value | lowercase }}{{ domainSuffix }}</mat-hint>
    <!-- <mat-error *ngIf="controlName.getError('pattern')">Somente letras minuscúlas e alpha numérico</mat-error> -->
    <mat-error *ngIf="controlName.getError('minlength')">Mínimo de 4 letras</mat-error>
    <mat-error *ngIf="controlName.getError('maxlength')">Maxímo de 6 letras</mat-error>
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
  public domainSuffix = CommonEnum.daily; // sufix @daily required to register
  public controlName: FormControl = nameIdField(inject(UniqueNameService)); // unique name id async

  @Output()
  public trigger = this.onChange(this.controlName); // dispatch event on form change

  public ngOnInit(): void {
    this.controlName.setValue(this.inputValue);
    this.initForm.emit(this.controlName); // start event and add new form controll on form group
  }
}
