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
import { DialogActions, DialogAlert } from '../../../../../interface/dialogs.interface';
import { FollowingStatus } from '../../../../../core/enums/base.enum';
import { ButtonFollowerComponent } from '../../../../../core/components/button-follower/button-follower.component';

@Component({
  selector: 'app-initial-explore',
  templateUrl: './initial-explore.component.html',
  styleUrls: ['./initial-explore.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, DialogAlertComponent, ButtonFollowerComponent],
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialExploreComponent {
  public followingStatus = FollowingStatus;
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);

  @Input({ required: true })
  public profile!: User;

  @Output()
  public readonly socketio: EventEmitter<FollowRequest> = new EventEmitter();
  private readonly dialogService = inject(DialogService);

  constructor(private readonly store: Store, private readonly dialog: MatDialog, private readonly router: Router) {}

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
