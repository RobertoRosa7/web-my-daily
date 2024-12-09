import { Component, OnInit } from '@angular/core';
import { FollowRequest } from '../../../core/interfaces/follows/follow.interface';
import { Profile } from '../../profile/profile';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { acUseFollow } from '../../../core/actions/profile/profile.action';
import { selUserPub } from '../../../core/selectors/public/public-profile.selector';
import { backgroundType } from '../../../core/types/colors/color.type';
import { actionColor } from '../../../core/actions/color/color.action';
import { actionProfilePublic } from '../../../core/actions/public/public-profile.action';
import { filter, map, Observable } from 'rxjs';
import { AuthType } from '@acTypes/auth/auth.type';
import { actionLoading } from '@actions/auth/auth.action';

@Component({
  selector: 'app-details-public-profile',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponentProfilePublic extends Profile implements OnInit {
  public readonly userProfile$ = this.store.select(selUserPub);
  public searchBy!: string | null;
  public isLoadingHelper = false; // auxiliar para loading

  public isLoading$: Observable<boolean> = this.actionSubject.pipe(
    // layer filer only action loading
    filter(({ type }) => type === AuthType.LOGIN_LOADING),
    // layer map catch payload action loading
    map((action) => {
      // abastract loading from action types
      const { isLoading } = action as { type: string; isLoading: boolean };

      // return loading
      return isLoading;
    })
  );

  constructor(
    protected override readonly store: Store,
    private readonly activeRoute: ActivatedRoute,
    private readonly actionSubject: ActionsSubject
  ) {
    super();
  }

  override ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => this.searchProfile(params.get('name')));

    this.store.dispatch(
      actionColor({
        theme: 'public',
        background: backgroundType.profileCover,
      })
    );
  }

  /**
   *
   * @param event FollowRequest
   */
  public onSocketio(event: FollowRequest) {
    this.store.dispatch(acUseFollow(event));
  }

  /**
   *
   * @param name string | null
   */
  private searchProfile(name: string | null) {
    this.searchBy = name;
    this.store.dispatch(actionLoading({ isLoading: false }));
    this.store.dispatch(actionProfilePublic({ name }));
  }
}
