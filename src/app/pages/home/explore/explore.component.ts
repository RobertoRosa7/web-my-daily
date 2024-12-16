import { Component } from '@angular/core';
import { HomeComponent } from '../home';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { FollowRequest } from '@interfaces/follows/follow.interface';
import { actionUserFollow } from '@actions/public/public-profile.action';
import { selectorPageablePub } from '@selectors/profile/profile.selector';

@Component({
  selector: 'app-explore',
  styleUrl: './explore.component.scss',
  template: `
    <main class="explore">
      <div class="page">
        @for(profile of userPageble$ | async; track $index) {
        <app-initial-explore [id]="userId$ | async" (socketio)="onSocketio($event)" [profile]="profile">
        </app-initial-explore>
        }
      </div>
    </main>
  `,
})
export class ExploreComponent extends HomeComponent {
  public readonly userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));

  constructor(protected override readonly store: Store) {
    super(store);
  }

  /**
   *
   * @param event FollowRequest
   */
  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }
}
