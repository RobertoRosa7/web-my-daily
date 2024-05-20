import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FollowerPipe } from '../../pipes/follwers.pipe';
import { SharedModule } from '../../../shared/shared.module';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { ButtonFollowerComponent } from '../button-follower/button-follower.component';
import { DialogService } from '../../services/dialog/dialog.service';
import { AuthService } from '../../../pages/auth/core/services/auth.services';
import { FollowRequest } from '../../../interface/follow.interface';
import { UserProfile } from '../../../pages/profile/core/interfaces/profile.interface';
import { FollowingStatus } from '../../enums/base.enum';
import { DialogActions, DialogAlert } from '../../../interface/dialogs.interface';

@Component({
  selector: 'app-follwers',
  styleUrl: './followers.component.scss',
  templateUrl: './followers.component.html',
  standalone: true,
  imports: [CommonModule, FollowerPipe, SharedModule, DialogAlertComponent, ButtonFollowerComponent],
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

  public readonly followingStatus = FollowingStatus;
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
