import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FollowerPipe } from '../../pipes/followers/follwers.pipe';
import { SharedModule } from '../../../shared/shared.module';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { ButtonFollowerComponent } from '../button-follower/button-follower.component';
import { DialogService } from '../../services/dialogs/dialog.service';
import { AuthService } from '../../services/auth/auth.services';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { UserProfile } from '../../interfaces/profile/profile.interface';
import { FollowingStatusEnum } from '../../enums/bases/base.enum';
import { DialogActions, DialogAlert } from '../../interfaces/dialogs/dialogs.interface';

@Component({
  selector: 'app-follwers',
  styleUrl: './followers.component.scss',
  templateUrl: './followers.component.html',
  standalone: true,
  imports: [CommonModule, FollowerPipe, SharedModule, ButtonFollowerComponent],
  providers: [AuthService, DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FollowersComponent {
  @Output()
  public readonly socketio: EventEmitter<FollowRequest> = new EventEmitter();

  @Input({ required: true })
  public profile!: UserProfile | null;

  @Input()
  public id!: string | undefined | null;

  public readonly followingStatus = FollowingStatusEnum;
  private readonly dialogService = inject(DialogService);

  constructor(private readonly dialog: MatDialog, private readonly router: Router) {}

  public get dialogOpen(): MatDialogRef<DialogAlertComponent, boolean> {
    const dialogData = new DialogAlert();
    const dialogAction = new DialogActions();

    dialogData.title = 'Você não fez login ainda';
    dialogData.message = 'Para poder continuar precisa fazer login';
    dialogAction.messageAction = 'Fazer login';
    dialogAction.messageClose = 'Fechar';
    dialogData.actions = dialogAction;

    return this.dialog.open(DialogAlertComponent, this.dialogService.dialogConfig(dialogData));
  }

  public onFollow(request: FollowRequest) {
    this.socketio.emit(request);
  }

  public requestLoginToFollow() {
    this.dialogOpen.afterClosed().subscribe({ next: (res) => this.goToLogin(res) });
  }

  private goToLogin(result: boolean | undefined) {
    if (result) {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
