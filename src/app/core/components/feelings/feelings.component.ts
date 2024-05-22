import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileHappen } from '../../../pages/profile/core/interfaces/profile.happen.interface';
import { FollowerPipe } from '../../pipes/follwers.pipe';
import { HappenPublicStatus } from '../../enums/base.enum';
import { Observable, concatMap, of } from 'rxjs';
import { selectorProfileName } from '../../../pages/profile/core/selectors/profile.selector';
import { UserProfile } from '../../../pages/profile/core/interfaces/profile.interface';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { DialogService } from '../../services/dialog/dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { happenDeleteRollback, happenUpdateRollback } from '../../../pages/profile/core/actions/profile.happens.action';
import { DialogHappenComponent } from '../dialog-happen/dialog-happen.component';
import { Store } from '@ngrx/store';
import { BreakLine } from '../../pipes/break-line.pipe';
import { DialogHappenDetailCompoent } from '../dialog-happen-detail/dialog-happen-detail.component';

type Name = Observable<Pick<UserProfile, 'name' | 'id'>>;

@Component({
  selector: 'app-feelings',
  templateUrl: `./feelings.component.html`,
  styleUrl: './feelings.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FollowerPipe,
    DialogAlertComponent,
    DialogHappenComponent,
    DialogHappenDetailCompoent,
    BreakLine,
  ],
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
    private readonly dialog: MatDialog
  ) {}

  public edit(data: ProfileHappen) {
    this.dialogService.previousText$.next(data.whatHappen);

    this.openDialogToUpdate(data).subscribe({
      next: (_) => {},
      error: (error) => {
        this.dialogService.showSnackbar(error, 'Não foi possível editar seu post.');
        this.store.dispatch(
          happenUpdateRollback({
            index: this.index,
            data: { ...data, whatHappen: this.dialogService.previousText$.getValue() },
          })
        );
      },
    });
  }

  public details(data: ProfileHappen) {
    this.dialog.open(DialogHappenDetailCompoent, this.dialogService.dialogConfigHappen({ data }));
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
   * openDialogToUpdate - open dialog to confirm remove
   *
   * @param data  ProfileHappen (required)
   * @returns
   */
  private openDialogToUpdate(data: ProfileHappen) {
    return this.dialog
      .open(DialogHappenComponent, this.dialogService.dialogConfigHappen({ data }))
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
