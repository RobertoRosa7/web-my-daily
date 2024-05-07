import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { selectorTheme } from '../../../pages/profile/core/selectors/color.selector';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-button-menu',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule],
  template: `
    <button
      class="btn-menu"
      [ngClass]="theme$ | async"
      disableRipple="true"
      matTooltip="Menu"
      [matMenuTriggerFor]="menus"
      mat-icon-button
      aria-label="Menu">
      <mat-icon>menu</mat-icon>
    </button>
    <mat-menu #menus="matMenu" overlapTrigger="true">
      <button mat-menu-item matTooltip="Perfil" [queryParams]="{ name: 'rosa@daily' }" [routerLink]="['/profile/user']">
        <mat-icon>person</mat-icon>
        <span>Perfil</span>
      </button>
      <button mat-menu-item matTooltip="Configurações" routerLink="/profile/setting">
        <mat-icon>settings</mat-icon>
        <span>Configurações</span>
      </button>
    </mat-menu>
  `,
})
export class ButtonMenuComponent {
  public theme$ = this.store.select(selectorTheme);
  constructor(private readonly store: Store) {}
}
