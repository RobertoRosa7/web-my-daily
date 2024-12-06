import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-button-menu',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule],
  template: `
    <button
      class="btn-menu"
      role="button"
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

      <button matTooltipPosition="left" mat-menu-item matTooltip="Configurações" routerLink="/profile/settings">
        <mat-icon>settings</mat-icon>
        <span>Configurações</span>
      </button>

      <button (click)="logout()" matTooltipPosition="left" mat-menu-item matTooltip="Sair" routerLink="/public">
        <mat-icon>logout</mat-icon>
        <span>Sair</span>
      </button>
    </mat-menu>
  `,
})
export class ButtonMenuComponent {
  @Output()
  public onLogout = new EventEmitter();

  public logout(): void {
    this.onLogout.emit();
  }
}
