import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-menu',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, MatBadgeModule, MatDividerModule, RouterModule],
  styles: `
    @import '../../../../themes/mixins';
    .btn-menu {
        @include btn-icon-radio;
        background-color: var(--white);
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
    }
  `,
  template: `
    <button
      class="btn-menu"
      disableRipple="true"
      matTooltip="Menu"
      [matMenuTriggerFor]="menus"
      mat-icon-button
      aria-label="Menu">
      <mat-icon>menu</mat-icon>
    </button>
    <mat-menu #menus="matMenu" overlapTrigger="true" class="profile">
      <button mat-menu-item matTooltip="Perfil" routerLink="/profile/user">
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
export class ButtonMenuComponent {}
