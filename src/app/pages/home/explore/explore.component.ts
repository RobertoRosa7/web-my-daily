import { Component } from '@angular/core';
import { HomeComponent } from '../home';
import { map } from 'rxjs';
import { FollowRequest } from '../../../core/interfaces/follows/follow.interface';
import { selectorPageablePub } from '../../../core/selectors/profile/profile.selector';
import { actionUserFollow } from '../../../core/actions/public/public-profile.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-explore',
  styleUrl: './explore.component.scss',
  template: `
    <main class="explore">
      <div class="page">
        <!-- <app-input-search></app-input-search> -->
        <app-initial-explore
          [id]="userId$ | async"
          *ngFor="let profile of userPageble$ | async"
          (socketio)="onSocketio($event)"
          [profile]="profile">
        </app-initial-explore>
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
