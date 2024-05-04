import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  constructor(protected readonly store: Store) {}

  ngOnInit(): void {}
}
