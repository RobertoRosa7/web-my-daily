import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FollowingStatus } from '../../enums/base.enum';
import { Observable } from 'rxjs';
import { selectorId } from '../../../pages/profile/core/selectors/user.selector';
import { User } from '../../../pages/profile/core/interfaces/profile.interface';
import { FollowRequest } from '../../../interface/follow.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-button-follower',
  templateUrl: './button-follower.component.html',
  styleUrls: ['./button-follower.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, DialogAlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonFollowerComponent {
  public followingStatus = FollowingStatus;
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);

  @Input({ required: true })
  public profile!: User;

  @Input()
  public id!: string | undefined | null;

  @Output()
  public readonly socketio: EventEmitter<FollowRequest> = new EventEmitter();

  @Output()
  public readonly onLogin: EventEmitter<void> = new EventEmitter();

  constructor(private readonly store: Store) {}

  public follow(followUser: User, currentId: string, followingStatus: FollowingStatus) {
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

  public requestFollow(followUser: User) {}
}
