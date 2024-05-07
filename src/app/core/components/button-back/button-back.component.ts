import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../../pages/profile/core/selectors/color.selector';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-button-back',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, RouterModule, CommonModule],
  template: `
    <button
      (click)="location.back()"
      aria-details="go back"
      aria-describedby="button"
      role="button"
      type="button"
      class="btn-back"
      [ngClass]="theme$ | async"
      disableRipple="true"
      matTooltip="voltar"
      mat-icon-button
      aria-label="volar">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
})
export class ButtonBackComponent {
  public theme$ = this.store.select(selectorTheme);
  constructor(public readonly location: Location, private readonly store: Store) {}
}
