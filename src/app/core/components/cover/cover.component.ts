import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectorBg } from '../../selectors/color.selector';

@Component({
  selector: 'app-cover',
  standalone: true,
  styleUrl: './cover.component.scss',
  template: `
    <div class="container-cover">
      <div class="cover" [style.background]="bgColor$ | async"></div>
    </div>
  `,
  imports: [CommonModule],
})
export class CoverComponent {
  public bgColor$ = this.store.select(selectorBg);
  constructor(private readonly store: Store) {}
}
