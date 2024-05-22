import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../core/selectors/color.selector';
import { actionColor } from '../profile/core/actions/color.action';
import { stringType } from '../../core/types/color.type';
import { selectorId } from '../profile/core/selectors/user.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <app-toolbar [id]="userId$ | async" />
    <router-outlet></router-outlet>
    <app-button-fab-create />
  `,
})
export class HomeComponent implements OnInit {
  public readonly theme$ = this.store.select(selectorTheme);
  public userId$: Observable<string | undefined> = this.store.select(selectorId);

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      actionColor({
        theme: 'home',
        background: stringType.profileCover,
      })
    );
  }
}
