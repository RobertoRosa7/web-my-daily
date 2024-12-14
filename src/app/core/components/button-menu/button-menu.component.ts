import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { RoutePathsEnum } from '@enums/bases/base.enum';

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
      <button
        matTooltipPosition="left"
        mat-menu-item
        matTooltip="Linha do tempo"
        [routerLink]="routePaths.routeHomeInit">
        <mat-icon>home</mat-icon>
        <span>Linha do tempo</span>
      </button>

      <button matTooltipPosition="left" mat-menu-item matTooltip="Perfil" [routerLink]="routePaths.routeProUser">
        <mat-icon>person</mat-icon>
        <span>Perfil</span>
      </button>

      <button
        matTooltipPosition="left"
        mat-menu-item
        matTooltip="Configurações"
        [routerLink]="routePaths.routeProSettings">
        <mat-icon>settings</mat-icon>
        <span>Configurações</span>
      </button>

      <mat-divider></mat-divider>

      <button
        matTooltipPosition="left"
        mat-menu-item
        matTooltip="Área Pública"
        [routerLink]="routePaths.routePublicArea">
        <mat-icon>open_in_new</mat-icon>
        <span>Área Pública</span>
      </button>
      <button
        class="btn-finish-session"
        (click)="logout()"
        matTooltipPosition="left"
        mat-menu-item
        matTooltip="Encerrar Sessão"
        [routerLink]="routePaths.routePublicArea">
        <mat-icon>logout</mat-icon>
        <span>Encerrar Sessão</span>
      </button>
    </mat-menu>
  `,
})
export class ButtonMenuComponent {
  @Output()
  public readonly onLogout = new EventEmitter();
  public readonly routePaths = RoutePathsEnum;

  public logout(): void {
    this.onLogout.emit();
  }
}
