import { Component } from '@angular/core';
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
      <button matTooltipPosition="left" mat-menu-item matTooltip="Inicial" routerLink="/home/initial">
        <mat-icon>home</mat-icon>
        <span>Inicial</span>
      </button>

      <button matTooltipPosition="left" mat-menu-item matTooltip="Perfil" routerLink="/profile/user">
        <mat-icon>person</mat-icon>
        <span>Perfil</span>
      </button>

      <button matTooltipPosition="left" mat-menu-item matTooltip="Configurações" routerLink="/profile/setting">
        <mat-icon>settings</mat-icon>
        <span>Configurações</span>
      </button>

      <button matTooltipPosition="left" mat-menu-item matTooltip="Sair" routerLink="/auth/login">
        <mat-icon>logout</mat-icon>
        <span>Sair</span>
      </button>
    </mat-menu>
  `,
})
export class ButtonMenuComponent {
  public theme$ = this.store.select(selectorTheme);
  constructor(private readonly store: Store) {}
}
