import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Public } from '../public';
import { selectorTheme } from '../../profile/core/selectors/color.selector';
import { actionColor } from '../../profile/core/actions/color.action';
import { stringType } from '../../profile/core/types/color.type';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, exhaustMap, map } from 'rxjs';
import { ProfileService } from '../../profile/core/services/profile.service';
import { io } from 'socket.io-client';
import { isPlatformBrowser } from '@angular/common';
import {
  ProfilePublicReponseObservable,
  ProfileResponse,
  ProfileSingletonOrPageable,
  UserProfile,
} from '../../profile/core/interfaces/profile.interface';
import { actionProfilePublic } from '../../profile/core/actions/profile.action';
import { selectorProfilePublic } from '../../profile/core/selectors/profile.selector';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends Public implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public messages = new BehaviorSubject<any>(null);

  public userPublicProfile$ = this.store.select(selectorProfilePublic);
  // public userPublicProfile$: ProfilePublicReponseObservable = this.activeRoute.queryParamMap.pipe(
  //   // layer exhaustMap - not go through until resolve mergge choose pageable profile or single profile
  //   exhaustMap((params) =>
  //     this.profileService.getProfilePublic(params.get('name')).pipe(map(this.profileMapper.bind(this)))
  //   )
  // );

  private platform = inject(PLATFORM_ID);
  constructor(
    protected override readonly store: Store,
    private readonly activeRoute: ActivatedRoute,
    private readonly profileService: ProfileService
  ) {
    super(store);
  }

  override ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) =>
      this.store.dispatch(actionProfilePublic({ name: params.get('name') }))
    );
    // this.socket.on('message', (data) => console.log(data));
    // const messages = this.wsService.fetchMessages();
    // messages.subscribe(console.log);

    // if (isPlatformBrowser(this.platform)) {
    //   const subject = io('ws://192.168.15.200:5001');
    //   subject.on('LISTENING_PUBLIC_PROFILE', (data) => this.messages.next(data));
    //   subject.emit('DISPATCH_PUBLIC_PROFILE', 'hello world from client browser');
    //   this.messages.subscribe(console.log);
    // }

    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: stringType.publicProfileCover,
      })
    );
  }

  /**
   * INFO:
   * profileMapper - choose if data result is a Pageable or Single
   *
   * @param param0 UserProfile | Pageable<Array<User>>
   * @returns profilePublicReponse
   */
  private profileMapper({ data }: ProfileResponse): ProfileSingletonOrPageable {
    if (data instanceof UserProfile) {
      return { pageable: null, data };
    }

    return { pageable: data, data: null };
  }
}
