import { Injectable, inject } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { DialogActions, DialogAlert, SnackBarActions, dialogData } from '../../interfaces/dialogs/dialogs.interface';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { concatMap, filter, first } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { happenDeleteLocal, happenPostLocal, happenUpdateLocal } from '../../actions/happens/profile.happens.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { happenTypes } from '../../types/happens/happen.type';
import { DialogHelperService } from './dialog-helper.service';

const createLocal = happenTypes.happenPostLocal;
const deleteLocal = happenTypes.happenDeleteLocal;
const updateLocal = happenTypes.happenUpdateLocal;
const index = 0;

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly scrollStrategy = inject(ScrollStrategyOptions);
  private readonly store = inject(Store);
  private readonly actionSubject = inject(ActionsSubject);
  private readonly snackbar = inject(MatSnackBar);
  /**
   * INFO:
   * dialogConfigHappen - responsible to config dialog to happen create
   *
   * @param data Dialog
   * @returns DialogRef
   */
  public dialogConfigHappenComments() {
    return {
      panelClass: 'dialog-comments',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '920px',
    };
  }
  /**
   * INFO:
   * dialogConfigHappen - responsible to config dialog to happen create
   *
   * @param data Dialog
   * @returns DialogRef
   */
  public dialogConfigHappen() {
    return {
      panelClass: 'dialog-custom',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
    };
  }

  /**
   * INFO:
   * showSnackbar - show snackbar after operation
   *
   * @param error HttpErrorResponse
   * @param msg string
   */
  public showSnackbar(error: HttpErrorResponse, msg: string) {
    this.snackbar.open(error.error ? error.error.message : msg, 'ok', {
      duration: 1000,
    });
  }

  /**
   * INFO:
   * create dialog config info
   */
  public get createDialogConfig() {
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
   * dialogConfig - custom config to dialog alert before remove something
   *
   * @param data DialogAlert
   * @returns MatDialogConfig
   */
  public dialogConfig(data: DialogAlert): MatDialogConfig<DialogAlert> {
    return {
      panelClass: 'dialog-custom',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '450px',
      maxHeight: '220px',
      data: {
        title: data.title,
        message: data.message,
        actions: {
          messageAction: data.actions.messageAction,
          messageClose: data.actions.messageClose,
        },
      },
    };
  }

  /**
   * INFO:
   * dispatch action local to remove - listening event delete local and show snackbar
   * @param happen ProfileHappen (required)
   * @returns Observable<boolean>
   */
  public listeningDelete(index: number, data: ProfileHappen) {
    // dispatch action to delete on reducer store
    this.store.dispatch(happenDeleteLocal({ index, data }));

    return this.listeningEvent(index, data, SnackBarActions.delete, deleteLocal);
  }

  /**
   * INFO:
   * dispatch action local to remove - listening event delete local and show snackbar
   * @param happen ProfileHappen (required)
   * @returns Observable<boolean>
   */
  public listeningUpdate(index: number, data: ProfileHappen) {
    // dispatch action to update on reducer store
    this.store.dispatch(happenUpdateLocal({ index, data }));

    return this.listeningEvent(index, data, SnackBarActions.update, updateLocal);
  }

  /**
   * INFO:
   * dispatch action local to create - listening event create local and show snackbar
   * @param data string (required)
   * @returns Observable<boolean>
   */
  public listeningEventCreate(data: ProfileHappen) {
    // dispatch action to create on reducer store
    this.store.dispatch(happenPostLocal({ index: index, data }));

    return this.listeningEvent(index, data, SnackBarActions.create, createLocal);
  }

  /**
   * INFO:
   * open snackbar to show option to cancel before delete on remote serve
   * @param happen ProfileHappen (required)
   * @returns Observable<boolean>
   */
  public openSnackerbar(index: number, data: ProfileHappen, action: SnackBarActions) {
    // show snackbar to give to the user option to cancel or not
    return (
      this.snackbar
        .open(`${data.whatHappen.substring(0, 20)}...`, 'desfazer', { duration: 2000 })
        // layer convert snackbar into observable
        .afterDismissed()
        .pipe(
          // layer to call dialog helper service
          concatMap(({ dismissedByAction }) =>
            new DialogHelperService(index, dismissedByAction, data, this.store)[action]()
          )
        )
    );
  }

  /**
   * INFO:
   * listeningEvent - responsible to listening action actions types
   *
   * @param actionType string (required)
   */
  private listeningEvent(index: number, data: ProfileHappen, action: SnackBarActions, actionType: string) {
    // listening some event on reducers
    return this.actionSubject.pipe(
      // layer filter only events according type passing in the parameter
      filter(({ type }) => type === actionType),
      // layer first event only
      first(),
      // layer open snackbar
      concatMap(() => this.openSnackerbar(index, data, action))
    );
  }
}
