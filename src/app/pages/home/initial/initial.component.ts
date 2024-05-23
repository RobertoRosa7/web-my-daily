import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home';
import { Store } from '@ngrx/store';
import { selectorPageablePub } from '../../profile/core/selectors/profile.selector';
import { FollowRequest } from '../../../core/interfaces/follows/follow.interface';
import { actionUserFollow } from '../../profile/core/actions/profile.action';
import { map } from 'rxjs';
import { actionColor } from '../../profile/core/actions/color.action';
import { MatTabChangeEvent } from '@angular/material/tabs';

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

  override ngOnInit(): void {}

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }

  public onTabChange({ index }: MatTabChangeEvent): void {
    const tabIndex: any = {
      0: () => this.store.dispatch(actionColor({ theme: 'home explore' })),
      1: () => this.store.dispatch(actionColor({ theme: 'home timeline' })),
      2: () => this.store.dispatch(actionColor({ theme: 'home sentiment' })),
    };
    tabIndex[index]();
  }
}
