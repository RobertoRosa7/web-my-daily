import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-back',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, RouterModule],
  styles: `
    @import '../../../../themes/mixins';
    .btn-menu {
        @include btn-icon-radio;
    }
  `,
  template: `
    <button class="btn-menu" disableRipple="true" matTooltip="voltar" mat-icon-button aria-label="volar">
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
})
export class ButtonBackComponent {}
