import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home';
import { Store } from '@ngrx/store';
import { selectorPageablePub } from '../../profile/core/selectors/profile.selector';
import { FollowRequest } from '../../../interface/follow.interface';
import { actionProfilePublic, actionUserFollow } from '../../profile/core/actions/profile.action';
import { map } from 'rxjs';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent extends HomeComponent implements OnInit {
  public readonly userPageble$ = this.store.select(selectorPageablePub).pipe(map((res) => res?.content));
  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(actionProfilePublic({ name: null }));
  }

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }
}
