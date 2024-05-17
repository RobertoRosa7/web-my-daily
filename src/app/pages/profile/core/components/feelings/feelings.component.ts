import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileHappen } from '../../interfaces/profile.happen.interface';
import { FollowerPipe } from '../../../../../core/pipes/follwers.pipe';
import { HappenPublicStatus } from '../../../../../core/enums/base.enum';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, filter, map, mergeMap } from 'rxjs';
import { selectorProfileName } from '../../selectors/profile.selector';
import { UserProfile } from '../../interfaces/profile.interface';
import { DialogAlertComponent } from '../../../../../core/components/dialog-alert/dialog-alert.component';
import { DialogService } from '../../../../../core/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogActions, DialogAlert } from '../../../../../interface/dialogs.interface';
import { actionProfileHappensDelete, actionProfileHappensPost } from '../../actions/profile.happens.action';
import { profileType } from '../../types/profile.type';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feelings',
  templateUrl: `./feelings.component.html`,
  styleUrl: './feelings.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, FollowerPipe, DialogAlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeelingsComponent {
  public readonly status = HappenPublicStatus;
  public readonly userName$: Observable<Pick<UserProfile, 'name' | 'id'>> = this.store.select(selectorProfileName);

  @Input({ required: true })
  public happen!: ProfileHappen;

  @Input({ required: true })
  public index!: number;

  constructor(
    private readonly store: Store,
    private readonly dialogService: DialogService,
    private readonly dialog: MatDialog,
    private readonly actionSubject: ActionsSubject,
    private readonly snackbar: MatSnackBar
  ) {}

  public remove(happen: ProfileHappen) {
    const dataDialog = new DialogAlert();
    const dialogAction = new DialogActions();

    dataDialog.title = 'Você vai remover este feeling?';
    dataDialog.message = 'Para continuar clique no em confirmar';

    dialogAction.messageAction = 'Confirmar';
    dialogAction.messageClose = 'Fechar';

    dataDialog.actions = dialogAction;

    const dialog = this.dialog.open(DialogAlertComponent, this.dialogService.dialogConfig(dataDialog));
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.store.dispatch(actionProfileHappensDelete({ index: this.index, data: happen }));

        this.actionSubject
          .pipe(filter(({ type }) => type === profileType.USER_PROFILE_HAPPENS_DELETE))
          .pipe(
            mergeMap(() =>
              this.snackbar
                .open(happen.whatHappen, 'cancelar', { duration: 3000 })
                .onAction()
                .pipe(map(() => 'cancel'))
            )
          )
          .subscribe((res) => {
            if (res) {
              this.store.dispatch(actionProfileHappensPost({ index: this.index, data: happen }));
            }
          });
      }
    });
  }
}
