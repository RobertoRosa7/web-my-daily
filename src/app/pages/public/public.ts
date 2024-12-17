import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer, filter, map, mergeMap, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ListeningFollowResponse } from '../../core/interfaces/follows/follow.interface';
import { selTheme } from '../../core/selectors/colors/color.selector';
import { selGetId } from '../../core/selectors/user/user.selector';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { JsonMapProperties } from '../../core/decorators/jsons/json.decorator';
import { acUsFollowers } from '../../core/actions/user/user.action';
import { acShowMessage } from '@actions/message/message.action';
import { ShowMessage } from '@interfaces/message/message.interface';
import { PathResources } from '@enums/bases/base.enum';

@Component({
  selector: 'app-public',
  template: `
    <app-toolbar [id]="userId$ | async"></app-toolbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Public implements OnInit {
  public readonly pathResources = PathResources;
  public readonly theme$ = this.store.select(selTheme);
  public readonly userId$: Observable<string | undefined> = this.store.select(selGetId);

  protected readonly platform = inject(PLATFORM_ID);
  // protected socketio!: Socket;

  constructor(protected readonly store: Store) {}

  ngOnInit(): void {
    // if (isPlatformBrowser(this.platform)) {
    //   this.socketio = io(environment.ws + '/profile');
    //   this.userId$
    //     .pipe(
    //       tap((id) => this.socketio.emit('dispatch_following', id, id)),
    //       mergeMap((id) =>
    //         this.listeningFollows$().pipe(
    //           map((response) => JsonMapProperties.deserialize(ListeningFollowResponse, response)),
    //           filter(({ userId }: ListeningFollowResponse) => userId === id)
    //         )
    //       )
    //     )
    //     .subscribe({
    //       next: (data) => this.store.dispatch(actionUserFollowers(data)),
    //     });
    // }
  }

  // public listeningFollows$() {
  //   return new Observable((observer: Observer<ListeningFollowResponse>) => {
  //     this.socketio.on('listening_following', (data) => {
  //       if (data) {
  //         observer.next(data);
  //       } else {
  //         observer.error('Unable To Reach Server');
  //       }
  //     });
  //     return () => this.socketio.disconnect();
  //   });
  // }

  /**
   * Dispatch action to update display message
   *
   * @param message string
   * @param type string
   */
  protected showMessage(message: string, type: string): void {
    this.store.dispatch(
      acShowMessage({
        body: this.buildShowMessage(message, type),
      })
    );
  }

  /**
   * Constructs an error message for display.
   * @param message The error message.
   */
  protected buildShowMessage(message: string, type: string): ShowMessage {
    const body = new ShowMessage();

    body.message = message;
    body.type = type;
    body.show = true;

    return body;
  }
}
