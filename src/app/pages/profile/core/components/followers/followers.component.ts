import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProfileObservable, UserProfile } from '../../interfaces/profile.interface';
import { selectorProfile } from '../../selectors/profile.selector';
import { Store } from '@ngrx/store';
import { FollowerPipe } from '../../../../../core/pipes/follwers.pipe';
import { SharedModule } from '../../../../../shared/shared.module';
import { AuthService } from '../../../../auth/core/services/auth.services';
import { DialogAlertComponent } from '../../../../../core/components/dialog-alert/dialog-alert.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectorId } from '../../selectors/user.selector';
import { FollowRequest } from '../../../../../interface/follow.interface';
import { DialogService } from '../../../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-follwers',
  styleUrl: './followers.component.scss',
  templateUrl: './followers.component.html',
  standalone: true,
  imports: [CommonModule, FollowerPipe, SharedModule, DialogAlertComponent],
  providers: [AuthService, DialogService],
})
export class FollowersComponent {
  @Output()
  public socketio: EventEmitter<FollowRequest> = new EventEmitter();

  public userId$: Observable<string | undefined> = this.store.select(selectorId);
  public userProfile$: ProfileObservable = this.store.select(selectorProfile);
  private readonly dialogService = inject(DialogService);

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  public get dialogOpen(): MatDialogRef<DialogAlertComponent, boolean> {
    return this.dialog.open(DialogAlertComponent, this.dialogService.dialogConfig);
  }

  public follow(followUser: UserProfile, currentId: string) {
    if (!this.authService.isSessionUser()) {
      this.dialogOpen.afterClosed().subscribe({ next: (res) => this.goToLogin(res) });
    } else {
      this.socketio.emit(this.dialogService.buildFollowRequest(followUser.id, currentId));
    }
  }

  public requestFollow(userProfile: UserProfile) {
    if (!this.authService.isSessionUser()) {
      this.dialogOpen.afterClosed().subscribe({ next: (res) => this.goToLogin(res) });
    }
  }

  private goToLogin(result: boolean | undefined) {
    if (result) {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
