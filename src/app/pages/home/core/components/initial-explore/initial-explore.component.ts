import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../../profile/core/interfaces/profile.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorId } from '../../../../profile/core/selectors/user.selector';
import { AuthService } from '../../../../auth/core/services/auth.services';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../../../../core/components/dialog-alert/dialog-alert.component';
import { FollowRequest } from '../../../../../interface/follow.interface';
import { DialogService } from '../../../../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-initial-explore',
  templateUrl: './initial-explore.component.html',
  styleUrls: ['./initial-explore.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, DialogAlertComponent],
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialExploreComponent {
  public userId$: Observable<string | undefined> = this.store.select(selectorId);

  @Input({ required: true })
  public profile!: User;

  @Output()
  public socketio: EventEmitter<FollowRequest> = new EventEmitter();
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
  public follow(followUser: User, currentId: string) {
    if (!this.authService.isSessionUser()) {
      this.dialogOpen.afterClosed().subscribe({ next: (res) => this.goToLogin(res) });
    } else {
      this.socketio.emit(this.dialogService.buildFollowRequest(followUser.id, currentId));
    }
  }

  public requestFollow(followUser: User) {
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
