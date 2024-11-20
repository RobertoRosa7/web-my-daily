import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../pages/profile/core/interfaces/profile.interface';
import { AuthService } from '../../../pages/auth/core/services/auth.services';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { FollowRequest } from '../../interfaces/follows/follow.interface';
import { DialogService } from '../../services/dialogs/dialog.service';
import { DialogActions, DialogAlert } from '../../interfaces/dialogs/dialogs.interface';
import { FollowingStatus } from '../../enums/bases/base.enum';
import { ButtonFollowerComponent } from '../button-follower/button-follower.component';

@Component({
  selector: 'app-initial-explore',
  templateUrl: './initial-explore.component.html',
  styleUrls: ['./initial-explore.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, ButtonFollowerComponent],
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialExploreComponent {
  public followingStatus = FollowingStatus;

  @Input({ required: true })
  public profile!: User;

  @Input()
  public id!: string | undefined | null;

  @Output()
  public readonly socketio: EventEmitter<FollowRequest> = new EventEmitter();
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
