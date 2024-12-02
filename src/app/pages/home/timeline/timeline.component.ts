import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeComponent } from '../home';
import { LikeSocketio, ProfileHappenObservable } from '../../../core/interfaces/happens/profile.happen.interface';
import { selectorHappens } from '../../../core/selectors/happens/profile.happens.selector';
import { isPlatformBrowser } from '@angular/common';
import { happenTimeline } from '../../../core/actions/happen/profile.happens.action';
import { Observable, Observer, filter, map, mergeMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Socket, io } from 'socket.io-client';
import { JsonMapProperties } from '../../../core/decorators/jsons/json.decorator';
import { actionLikedSocketio } from '../../../core/actions/happen/likes.action';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent extends HomeComponent implements OnInit {
  public timeline$: ProfileHappenObservable = this.store.select(selectorHappens);

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.store.dispatch(happenTimeline());

      const socketio = io(environment.ws + '/likes');

      this.userId$
        .pipe(
          mergeMap((id) =>
            this.listeningLikes$(socketio, 'listening_likes').pipe(
              map((response) => JsonMapProperties.deserialize(LikeSocketio, response)),
              filter(({ ownerId }) => ownerId === id)
            )
          )
        )
        .subscribe({
          next: (res) => this.store.dispatch(actionLikedSocketio(res)),
        });
    }
  }

  public listeningLikes$(socketio: Socket, event: string) {
    return new Observable((observer: Observer<any>) => {
      socketio.on(event, (data) => (data ? observer.next(data) : observer.error('Unable To Reach Server')));
      return () => this.socketio.disconnect();
    });
  }
}
