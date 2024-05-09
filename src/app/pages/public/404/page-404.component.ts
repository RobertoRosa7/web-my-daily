import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CoverComponent } from '../../../core/components/cover/cover.component';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../profile/core/selectors/color.selector';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [CommonModule, CoverComponent],
  styleUrl: './page-404.component.scss',
  template: ` <main [ngClass]="theme$ | async" class="h-full">
    <div class="page">
      <app-cover></app-cover>
      <div class="search"></div>
      <div class="container-404">
        <div class="text">
          <h1>404</h1>
        </div>
        <div class="text">
          <h1>OOps</h1>
          <span>{{ someText }}</span>
        </div>
      </div>
    </div>
  </main>`,
})
export class Page404Component {
  public someText = 'The page your are looking for no longer exits. Perhaps you can return back to site hompage';

  public theme$ = this.store.select(selectorTheme);

  constructor(private readonly store: Store) {}
}
