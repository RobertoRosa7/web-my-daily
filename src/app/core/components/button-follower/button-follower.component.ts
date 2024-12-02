import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FollowingStatusEnum } from '../../enums/bases/base.enum';
import { Observable } from 'rxjs';
import { selGetId } from '../../selectors/user/user.selector';
import { User } from '../../interfaces/profile/profile.interface';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-button-follower',
  templateUrl: './button-follower.component.html',
  styleUrls: ['./button-follower.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFollowerComponent {
  public followingStatus = FollowingStatusEnum;
  public readonly userId$: Observable<string | undefined> = this.store.select(selGetId);

  @Input({ required: true })
  public profile!: User;

  @Input()
  public id!: string | undefined | null;

  @Output()
  public readonly socketio: EventEmitter<FollowRequest> = new EventEmitter();

  @Output()
  public readonly onLogin: EventEmitter<void> = new EventEmitter();

  constructor(private readonly store: Store) {}

  public follow(followUser: User, currentId: string, followingStatus: FollowingStatusEnum) {
    const request = new FollowRequest();
    request.ev = 'dispatch_following';
    request.userId = currentId;
    request.followingId = followUser.id;
    request.followingStatus = followingStatus;

    this.socketio.emit(request);
  }

  public requestLoginToFollow() {
    this.onLogin.emit();
  }
}
