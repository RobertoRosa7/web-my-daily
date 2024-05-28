import { Component, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DialogHappenComponent } from '../dialog-happen/dialog-happen.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../services/dialogs/dialog.service';
import { ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { concatMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { happenFindOneLocal, happenPostRollback } from '../../actions/happens/profile.happens.action';

@Component({
  selector: 'app-button-fab-create',
  templateUrl: './button-fab-create.component.html',
  styleUrl: './button-fab-create.component.scss',
  standalone: true,
  imports: [SharedModule, DialogHappenComponent],
  providers: [DialogService],
})
export class ButtonFabCreateComponent {
  private readonly dialog = inject(MatDialog);
  private readonly dialogService = inject(DialogService);
  private readonly store = inject(Store);

  /**
   * INFO:
   * onOpenDialog - listening event click to open dialog on button fab
   */
  public onOpenDialog(): void {
    this.openDialogCreateHappen()
      .pipe(concatMap((res) => (res ? this.dialogService.listeningEventCreate(res) : of())))
      .subscribe({
        next: (_) => {},
        error: (error) => {
          this.dialogService.showSnackbar(error, 'Não foi possível criar seu post.');
          this.store.dispatch(
            happenPostRollback({
              index: 0,
              data: new ProfileHappen(),
            })
          );
        },
      });
  }

  /**
   * INFO:
   * openDialogCreateHappen - open dialog
   * @returns
   */
  private openDialogCreateHappen() {
    this.store.dispatch(happenFindOneLocal({ index: 0, data: new ProfileHappen() }));
    return this.dialog.open(DialogHappenComponent, this.dialogService.dialogConfigHappen()).afterClosed();
  }
}
