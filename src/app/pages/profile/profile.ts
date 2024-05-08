import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  protected platform = inject(PLATFORM_ID);

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {}
}
