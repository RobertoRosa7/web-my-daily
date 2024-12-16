import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, filter, map } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { AuthType } from '@acTypes/auth/auth.type';

/**
 * @see: https://angular.io/guide/form-validation
 */
@Component({
  selector: 'app-button-submit',
  template: `
    <button
      type="submit"
      [disabled]="form.invalid || (isLoading$ | async)"
      class="w-full bg-blue-500 text-white py-3 cursor-pointer disabled:bg-blue-300"
      [style.backgroundColor]="color">
      <span *ngIf="!(isLoading$ | async)">{{ name }}</span>
      <mat-spinner
        style="display: inline-block; min-height: inherit"
        diameter="18"
        *ngIf="isLoading$ | async"></mat-spinner>
    </button>
  `,
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class ButtonSubmitComponent {
  public readonly isLoading$!: Observable<boolean>;
  private readonly actionSubject = inject(ActionsSubject);

  @Input({ required: true })
  public form!: FormGroup;

  @Input({ required: true })
  public name!: string;

  @Input()
  public color!: string;

  constructor() {
    this.isLoading$ = this.actionSubject.pipe(
      // layer filer only action loading
      filter(({ type }) => type === AuthType.authLoadingType),
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
