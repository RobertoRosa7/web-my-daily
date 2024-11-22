import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { FollowerPipe } from '../../pipes/followers/follwers.pipe';
import { HappenPublicStatus } from '../../enums/bases/base.enum';
import { Observable, concatMap, of } from 'rxjs';
import { selectorProfileName } from '../../../pages/profile/core/selectors/profile.selector';
import { UserProfile } from '../../../pages/profile/core/interfaces/profile.interface';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { DialogService } from '../../services/dialogs/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import {
  happenComments,
  happenDeleteRollback,
  happenFindOneLocal,
  happenStoppingViewing,
  happenUpdateRollback,
} from '../../actions/happens/profile.happens.action';
import { DialogHappenComponent } from '../dialog-happen/dialog-happen.component';
import { Store } from '@ngrx/store';
import { DialogHappenDetailCompoent } from '../dialog-happen-detail/dialog-happen-detail.component';
import { actionDislikedLocal, actionLikedLocal } from '../../actions/happens/likes.action';
import { SnackBarActions } from '../../interfaces/dialogs/dialogs.interface';
import { DialogHelperService } from '../../services/dialogs/dialog-helper.service';
import { DialogHappenCommentsComponent } from '../dialog-happen-comments/dialog-happen-comments.component';

type Name = Observable<Pick<UserProfile, 'name' | 'id'>>;

@Component({
  selector: 'app-feelings',
  templateUrl: `./feelings.component.html`,
  styleUrl: './feelings.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule, FollowerPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class FeelingsComponent {
  public readonly status = HappenPublicStatus;
  public readonly userName$: Name = this.store.select(selectorProfileName);

  @Input({ required: true })
  public happen!: ProfileHappen;

  @Input({ required: true })
  public index!: number;

  @Input()
  public id!: undefined | string | null;

  constructor(
    private readonly store: Store,
    private readonly dialogService: DialogService,
    private readonly dialog: MatDialog
  ) {}

  public disliked(disliked: boolean, happen: ProfileHappen): void {
    // previous like to rollback
    DialogHelperService.previousDisLike$.next(!disliked);

    // builder like request
    const builder = (value: boolean) => ({
      index: this.index,
      request: DialogHelperService.dislikeBuilder(value, happen),
    });

    // dispatch like local
    this.store.dispatch(actionDislikedLocal(builder(disliked)));

    // open snackabar
    this.dialogService.openSnackerbar(this.index, happen, SnackBarActions.disliked).subscribe({
      next: (_) => {},
      error: (error) => {
        this.dialogService.showSnackbar(error, 'Não foi possível curtir este post');
        this.store.dispatch(actionDislikedLocal(builder(disliked)));
      },
    });
  }

  public liked(liked: boolean, happen: ProfileHappen): void {
    // previous like to rollback
    DialogHelperService.previousLike$.next(!liked);

    // builder like request
    const builder = (value: boolean) => ({
      index: this.index,
      request: DialogHelperService.likedBuilder(value, happen),
    });

    // dispatch like local
    this.store.dispatch(actionLikedLocal(builder(liked)));

    // open snackabar
    this.dialogService.openSnackerbar(this.index, happen, SnackBarActions.liked).subscribe({
      next: (_) => {},
      error: (error) => {
        this.dialogService.showSnackbar(error, 'Não foi possível curtir este post');
        this.store.dispatch(actionLikedLocal(builder(liked)));
      },
    });
  }

  public edit(data: ProfileHappen) {
    // previous text to rollback
    DialogHelperService.previousText$.next(data.whatHappen);

    // open dialog to update happen
    this.openDialogToUpdate(data).subscribe({
      next: (_) => {},
      error: (error) => {
        this.dialogService.showSnackbar(error, 'Não foi possível editar seu post.');
        this.store.dispatch(
          happenUpdateRollback({
            index: this.index,
            data: { ...data, whatHappen: DialogHelperService.previousText$.getValue() },
          })
        );
      },
    });
  }

  /**
   * INFO: details - it's deprecated until find some web designer to create this page
   *
   * @deprecated
   * @param data ProfileHappen
   */
  public details(data: ProfileHappen) {
    this.store.dispatch(happenFindOneLocal({ index: this.index, data }));
    this.dialog.open(DialogHappenDetailCompoent, this.dialogService.dialogConfigHappen());
  }

  /**
   * INFO: comments - it's deprecated until find some web designer to create this page
   *
   * @param data ProfileHappen
   */
  public comments(data: ProfileHappen) {
    const payload = { index: this.index, data };

    this.store.dispatch(happenComments(payload));
    this.store.dispatch(happenFindOneLocal(payload));
    this.dialog.open(DialogHappenCommentsComponent, this.dialogService.dialogConfigHappenComments());
  }

  /**
   * INFO:
   * remove - dispatch pipe to remove card
   *
   * @param data ProfileHappen
   */
  public remove(data: ProfileHappen): void {
    // open dialog to confirm
    this.openDialogToDelete(data).subscribe({
      next: (_) => {},
      error: (error) => {
        this.dialogService.showSnackbar(error, 'Não foi possível exlcuir seu post.');
        this.store.dispatch(happenDeleteRollback({ index: this.index, data }));
      },
    });
  }

  /**
   * INFO:
   * stoppingViewing - stopping receive feelings cards from followers
   * @param happen ProfileHappen
   */
  public stoppingViewing(happen: ProfileHappen) {
    this.store.dispatch(happenStoppingViewing({ happenId: happen.id, ownerId: happen.userId }));
  }

  /**
   * INFO:
   * openDialogToUpdate - open dialog to confirm remove
   *
   * @param data  ProfileHappen (required)
   * @returns
   */
  private openDialogToUpdate(data: ProfileHappen) {
    this.store.dispatch(happenFindOneLocal({ index: this.index, data }));
    return this.dialog
      .open(DialogHappenComponent, this.dialogService.dialogConfigHappen())
      .afterClosed()
      .pipe(
        concatMap((response: ProfileHappen) =>
          response
            ? this.dialogService.listeningUpdate(this.index, {
                ...data,
                whatHappen: response.whatHappen,
                visibility: response.visibility,
              })
            : of()
        )
      );
  }

  /**
   * INFO:
   * open dialog to confirm remove
   *
   * @param data  ProfileHappen (required)
   * @returns
   */
  private openDialogToDelete(data: ProfileHappen) {
    return this.dialog
      .open(DialogAlertComponent, this.dialogService.dialogConfig(this.dialogService.createDialogConfig))
      .afterClosed()
      .pipe(
        concatMap((response: ProfileHappen) => (response ? this.dialogService.listeningDelete(this.index, data) : of()))
      );
  }
}
