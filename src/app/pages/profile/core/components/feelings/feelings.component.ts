import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileHappen } from '../../interfaces/profile.happen.interface';
import { FollowerPipe } from '../../../../../core/pipes/follwers.pipe';
import { HappenPublicStatus } from '../../../../../core/enums/base.enum';
import { ActionsSubject, Store } from '@ngrx/store';
import { Observable, concatMap, filter, first, map, of } from 'rxjs';
import { selectorProfileName } from '../../selectors/profile.selector';
import { UserProfile } from '../../interfaces/profile.interface';
import { DialogAlertComponent } from '../../../../../core/components/dialog-alert/dialog-alert.component';
import { DialogService } from '../../../../../core/services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogActions, DialogAlert } from '../../../../../interface/dialogs.interface';
import {
  actionProfileHappenDeleteRemote,
  actionProfileHappensDelete,
  actionProfileHappensPost,
} from '../../actions/profile.happens.action';
import { profileType } from '../../types/profile.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectHappenError } from '../../selectors/profile.happens.selector';

const deleteLocal = profileType.USER_PROFILE_HAPPENS_DELETE_LOCAL;
type Name = Observable<Pick<UserProfile, 'name' | 'id'>>;

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
  public readonly userName$: Name = this.store.select(selectorProfileName);

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

  /**
   * INFO:
   * remove - dispatch pipe to remove card
   *
   * @param happen ProfileHappen
   */
  public remove(happen: ProfileHappen): void {
    // open dialog to confirm
    this.openDialogToDelete(happen).subscribe({
      next: (_) => {},
      error: (error) => {
        this.snackbar.open(error.error ? error.error.message : 'Não foi possível exlcuir seu post.', 'ok', {
          duration: 1000,
        });

        this.store.dispatch(actionProfileHappensPost({ index: this.index, data: happen }));
      },
    });
  }

  /**
   * INFO:
   * create dialog config info
   */
  private get createDialogConfig() {
    const dataDialog = new DialogAlert();
    const dialogAction = new DialogActions();

    dataDialog.title = 'Você vai remover este feeling?';
    dataDialog.message = 'Para continuar clique no em confirmar';

    dialogAction.messageAction = 'Confirmar';
    dialogAction.messageClose = 'Fechar';

    dataDialog.actions = dialogAction;
    return dataDialog;
  }

  /**
   * INFO:
   * open dialog to confirm remove
   * @param happen  ProfileHappen (required)
   * @returns
   */
  private openDialogToDelete(happen: ProfileHappen) {
    // open dialog to confirm remove

    return this.dialog
      .open(DialogAlertComponent, this.dialogService.dialogConfig(this.createDialogConfig))
      .afterClosed()
      .pipe(concatMap((res) => (res ? this.listeningEventDelete(happen) : of())));
  }

  /**
   * INFO:
   * dispatch action local to remove - listening event delete local and show snackbar
   * @param happen ProfileHappen (required)
   * @returns Observable<boolean>
   */
  private listeningEventDelete(happen: ProfileHappen) {
    // dispatch action local to remove
    this.store.dispatch(actionProfileHappensDelete({ index: this.index, data: happen }));

    return this.actionSubject.pipe(
      filter(({ type }) => type === deleteLocal),
      first(),
      concatMap(() => this.openSnackerbar(happen))
    );
  }

  /**
   * INFO:
   * open snackbar to show option to cancel before delete on remote serve
   * @param happen ProfileHappen (required)
   * @returns Observable<boolean>
   */
  private openSnackerbar(happen: ProfileHappen) {
    // open snackbar to show option to cancel before delete on remote serve
    return this.snackbar
      .open(happen.whatHappen, 'cancelar', { duration: 3000 })
      .afterDismissed()
      .pipe(concatMap(({ dismissedByAction }) => this.removeOrCancel(dismissedByAction, happen)));
  }

  /**
   * INFO:
   * removeOrCancel - responsible to excluir on backend or cancel
   *
   * @param dismissedByAction boolean
   * @param happen ProfileHappen
   * @returns null or Error
   */
  private removeOrCancel(dismissedByAction: boolean, happen: ProfileHappen) {
    if (dismissedByAction) {
      this.store.dispatch(actionProfileHappensPost({ index: this.index, data: happen }));
      return of();
    } else {
      this.store.dispatch(actionProfileHappenDeleteRemote(happen));
      return this.store.select(selectHappenError).pipe(
        filter((error) => !!error),
        map((e) => {
          throw new Error(e?.error);
        })
      );
    }
  }
}
