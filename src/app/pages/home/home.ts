import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  template: `
    <app-toolbar></app-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
  constructor(protected readonly store: Store) {}
}
