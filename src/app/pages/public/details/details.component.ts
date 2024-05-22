import { Component, OnInit } from '@angular/core';
import { FollowRequest } from '../../../interfaces/follow.interface';
import { Profile } from '../../profile/profile';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { actionUserFollow } from '../../profile/core/actions/profile.action';
import { selectorUserPub } from '../core/selectors/public-profile.selector';
import { stringType } from '../../../core/types/color.type';
import { actionColor } from '../../profile/core/actions/color.action';
import { actionProfilePublic } from '../core/actions/public-profile.action';

@Component({
  selector: 'app-details-public-profile',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponentProfilePublic extends Profile implements OnInit {
  public readonly userProfile$ = this.store.select(selectorUserPub);

  constructor(protected override readonly store: Store, private readonly activeRoute: ActivatedRoute) {
    super(store);
  }

  override ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) =>
      this.store.dispatch(actionProfilePublic({ name: params.get('name') }))
    );
    this.store.dispatch(
      actionColor({
        theme: 'public',
        background: stringType.publicProfileCover,
      })
    );
  }

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }
}