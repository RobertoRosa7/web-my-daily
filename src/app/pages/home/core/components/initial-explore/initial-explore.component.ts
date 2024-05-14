import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../../profile/core/interfaces/profile.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectorId } from '../../../../profile/core/selectors/user.selector';
import { AuthService } from '../../../../auth/core/services/auth.services';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../../../../core/components/dialog-alert/dialog-alert.component';
import { DialogAlert } from '../../../../../interface/dialogs.interface';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { FollowRequest } from '../../../../../interface/follow.interface';

@Component({
  selector: 'app-initial-explore',
  templateUrl: './initial-explore.component.html',
  styleUrls: ['./initial-explore.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, DialogAlertComponent],
  providers: [AuthService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialExploreComponent implements OnInit {
  public userId$: Observable<string | undefined> = this.store.select(selectorId);

  @Input({ required: true })
  public profile!: User;

  @Output()
  public socketio: EventEmitter<FollowRequest> = new EventEmitter();

  private scrollStrategy = inject(ScrollStrategyOptions);

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  public get dialogConfig(): MatDialogConfig<DialogAlert> {
    return {
      panelClass: 'dialog-custom',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '450px',
      maxHeight: '220px',
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

  public unFollow(followUser: User) {}
  public follow(followUser: User) {
    if (!this.authService.isSessionUser()) {
      this.dialogOpen.afterClosed().subscribe({ next: (res) => this.goToLogin(res) });
    } else {
      this.userId$.subscribe({
        next: (currentId) => {
          this.socketio.emit({
            ev: 'dispatch_following',
            followId: followUser.id,
            userId: currentId,
          });
        },
      });
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
