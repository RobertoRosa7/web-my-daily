import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileObservable, UserProfile } from '../../interfaces/profile.interface';
import { selectorProfile } from '../../selectors/profile.selector';
import { Store } from '@ngrx/store';
import { FollowerPipe } from '../../../../../core/pipes/follwers.pipe';
import { SharedModule } from '../../../../../shared/shared.module';
import { AuthService } from '../../../../auth/core/services/auth.services';
import { DialogAlertComponent } from '../../../../../core/components/dialog-alert/dialog-alert.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogAlert } from '../../../../../interface/dialogs.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectorId } from '../../selectors/user.selector';

@Component({
  selector: 'app-follwers',
  styleUrl: './followers.component.scss',
  templateUrl: './followers.component.html',
  standalone: true,
  imports: [CommonModule, FollowerPipe, SharedModule, DialogAlertComponent],
  providers: [AuthService],
})
export class FollowersComponent {
  public userId$: Observable<string | undefined> = this.store.select(selectorId);
  public userProfile$: ProfileObservable = this.store.select(selectorProfile);

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  public get dialogConfig(): MatDialogConfig<DialogAlert> {
    return {
      width: '100%',
      height: '100%',
      maxWidth: '450px',
      maxHeight: '250px',
      data: {
        title: 'Você não fez login ainda',
        message: 'Para poder continuar precisa fazer login',
        actions: {
          messageAction: 'Fazer login',
          messageClose: 'Fechar',
        },
      },
    };
  }

  public get dialogOpen(): MatDialogRef<DialogAlertComponent, boolean> {
    return this.dialog.open(DialogAlertComponent, this.dialogConfig);
  }

  public unfollow(user: UserProfile) {}

  public follow(userProfile: UserProfile) {
    if (!this.authService.isSessionUser()) {
      this.dialogOpen.afterClosed().subscribe({ next: (res) => this.goToLogin(res) });
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
