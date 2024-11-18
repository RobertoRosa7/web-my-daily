import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { actionProfileRequest } from './core/actions/profile.action';
import { happenRequest } from '../../core/actions/happens/profile.happens.action';
import { selectorId } from './core/selectors/user.selector';
import { selectorTheme } from '../../core/selectors/colors/color.selector';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { ListeningFollowResponse } from '../../core/interfaces/follows/follow.interface';
import { actionSocketUserMetrics } from './core/actions/socketio.action';
import { actionUserFollowers } from './core/actions/user.action';
import { JsonMapProperties } from '../../core/decorators/jsons/json.decorator';
import { actionColor } from './core/actions/color.action';
import { backgroundType } from '../../core/types/colors/color.type';

@Component({
  selector: 'app-profile',
  template: `
    <app-toolbar [id]="userId$ | async"></app-toolbar>
    <router-outlet></router-outlet>
    <app-button-fab-create />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile implements OnInit {
  public readonly theme$ = this.store.select(selectorTheme);
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);

  protected readonly platform = inject(PLATFORM_ID);
  protected socketio!: Socket;

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    
  }

}
