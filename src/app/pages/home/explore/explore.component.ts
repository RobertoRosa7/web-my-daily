import { Component } from '@angular/core';
import { HomeComponent } from '../home';
import { map } from 'rxjs';
import { FollowRequest } from '../../../core/interfaces/follows/follow.interface';
import { selectorPageablePub } from '../../../core/selectors/profile/profile.selector';
import { actionUserFollow } from '../../../core/actions/public/public-profile.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-explore',
  template: `
    <main class="explore">
      <div class="page">
        <app-input-search></app-input-search>
        <p class="feelingers">Novos feelingers</p>
        <app-initial-explore
          [id]="userId$ | async"
          *ngFor="let profile of userPageble$ | async"
          (socketio)="onSocketio($event)"
          [profile]="profile"></app-initial-explore>
      </div>
    </main>
  `,
  styleUrl: './explore.component.scss',
})
export class ExploreComponent extends HomeComponent {
  public readonly userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {}

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }
}
