import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Form } from '../../../auth.form';
import { Observable, filter, map } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { authType } from '../../type/auth.type';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-button-submit',
  template: `
    <button
      type="submit"
      [disabled]="form.invalid || (isLoading$ | async)"
      class="w-full bg-blue-500 text-white py-3 rounded-full cursor-pointer disabled:bg-slate-500">
      <span *ngIf="!(isLoading$ | async)">{{ name }}</span>
      <mat-spinner
        style="display: inline-block; min-height: inherit"
        diameter="18"
        *ngIf="isLoading$ | async"></mat-spinner>
    </button>
  `,
  styles: ` `,
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ButtonSubmitComponent {
  public isLoading$!: Observable<boolean>;
  private actionSubject = inject(ActionsSubject);

  @Input({ required: true }) public form!: FormGroup;
  @Input({ required: true }) public name!: string;

  constructor() {
    this.isLoading$ = this.actionSubject.pipe(
      // layer filer only action loading
      filter(({ type }) => type === authType.LOGIN_LOADING),
      // layer map catch payload action loading
      map((action) => {
        // abastract loading from action types
        const { isLoading } = action as { type: string; isLoading: boolean };

        // return loading
        return isLoading;
      })
    );
  }
}