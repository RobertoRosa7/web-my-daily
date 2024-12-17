import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectorTheme } from '@selectors/colors/color.selector';
import { CommonModule, Location } from '@angular/common';
import { RoutePathsEnum } from '@enums/bases/base.enum';

@Component({
  selector: 'app-button-back',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, RouterModule, CommonModule],
  template: `
    <button
      title="Voltar"
      (click)="navigateBackOrToHome()"
      aria-details="go back"
      aria-describedby="button"
      role="button"
      type="button"
      class="btn-back"
      [ngClass]="theme$ | async"
      matTooltip="voltar"
      mat-icon-button
      aria-label="volar">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
})
export class ButtonBackComponent {
  public readonly theme$ = this.store.select(selectorTheme);

  /**
   *
   * @param location Location
   * @param store Store
   * @param router Router
   */
  constructor(public readonly location: Location, private readonly store: Store, private readonly router: Router) {}

  /**
   * Navega para trás ou redireciona para a home se o histórico estiver vazio
   */
  public navigateBackOrToHome(): void {
    window.history.length > 1 ? this.location.back() : this.router.navigate([RoutePathsEnum.routePublicArea]);
  }
}
