import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ProfileObservable } from '../../interfaces/profile.interface';
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
import { DialogActions, DialogAlert } from '../../../../../interface/dialogs.interface';
import { FollowingStatus } from '../../../../../core/enums/base.enum';
import { ButtonFollowerComponent } from '../../../../../core/components/button-follower/button-follower.component';

@Component({
  selector: 'app-follwers',
  styleUrl: './followers.component.scss',
  templateUrl: './followers.component.html',
  standalone: true,
  imports: [CommonModule, FollowerPipe, SharedModule, DialogAlertComponent, ButtonFollowerComponent],
  providers: [AuthService, DialogService],
})
export class FollowersComponent {
  @Output()
  public readonly socketio: EventEmitter<FollowRequest> = new EventEmitter();
  public readonly followingStatus = FollowingStatus;
  public readonly userId$: Observable<string | undefined> = this.store.select(selectorId);
  public readonly userProfile$: ProfileObservable = this.store.select(selectorProfile);
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
