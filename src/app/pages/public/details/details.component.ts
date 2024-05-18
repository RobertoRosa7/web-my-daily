import { Component, OnInit } from '@angular/core';
import { FollowRequest } from '../../../interface/follow.interface';
import { Profile } from '../../profile/profile';
import { Store } from '@ngrx/store';
import { selectorUserPub } from '../../profile/core/selectors/profile.selector';
import { ActivatedRoute } from '@angular/router';
import { actionProfilePublic } from '../../profile/core/actions/profile.action';

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
  }

  public onSocketio(event: FollowRequest) {
    // this.store.dispatch(actionUserFollow(event));
  }
}
