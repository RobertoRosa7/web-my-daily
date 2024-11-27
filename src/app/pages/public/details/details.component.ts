import { Component, OnInit } from '@angular/core';
import { FollowRequest } from '../../../core/interfaces/follows/follow.interface';
import { Profile } from '../../profile/profile';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { acUseFollow } from '../../../core/actions/profile/profile.action';
import { selectorUserPub } from '../../../core/selectors/public/public-profile.selector';
import { backgroundType } from '../../../core/types/colors/color.type';
import { actionColor } from '../../../core/actions/color/color.action';
import { actionProfilePublic } from '../../../core/actions/public/public-profile.action';

@Component({
  selector: 'app-details-public-profile',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponentProfilePublic extends Profile implements OnInit {
  public readonly userProfile$ = this.store.select(selectorUserPub);

  constructor(protected override readonly store: Store, private readonly activeRoute: ActivatedRoute) {
    super();
  }

  override ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) =>
      this.store.dispatch(actionProfilePublic({ name: params.get('name') }))
    );
    this.store.dispatch(
      actionColor({
        theme: 'public',
        background: backgroundType.profileCover,
      })
    );
  }

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(acUseFollow(event));
  }
}
