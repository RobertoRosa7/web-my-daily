import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../core/selectors/colors/color.selector';
import { acColor } from '../../core/actions/color/color.action';
import { selGetId } from '../../core/selectors/user/user.selector';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { actionProfilePublic } from '../../core/actions/public/public-profile.action';
import { backgroundType } from '../../core/types/colors/color.type';
import { Socket } from 'socket.io-client';

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
  public readonly userId$: Observable<string | undefined> = this.store.select(selGetId);

  protected socketio!: Socket;
  protected readonly platform = inject(PLATFORM_ID);

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      acColor({
        theme: 'home timeline',
        background: backgroundType.socialHub,
      })
    );
  }
}
