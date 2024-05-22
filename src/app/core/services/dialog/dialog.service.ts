import { Injectable, inject } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { DialogActions, DialogAlert, SnackBarActions, dialogData } from '../../../interfaces/dialogs.interface';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ProfileHappen } from '../../../pages/profile/core/interfaces/profile.happen.interface';
import { BehaviorSubject, concatMap, filter, first, map, of } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { selectHappenError } from '../../../pages/profile/core/selectors/profile.happens.selector';
import {
  happenDeleteLocal,
  happenDeleteRemote,
  happenDeleteRollback,
  happenPostLocal,
  happenPostRemote,
  happenPostRollback,
  happenUpdateLocal,
  happenUpdateRemote,
  happenUpdateRollback,
} from '../../../pages/profile/core/actions/profile.happens.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { profileType } from '../../../pages/profile/core/types/profile.type';
import { HttpErrorResponse } from '@angular/common/http';

const createLocal = profileType.happenPostLocal;
const deleteLocal = profileType.happenDeleteLocal;
const updateLocal = profileType.happenUpdateLocal;
const index = 0;

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly scrollStrategy = inject(ScrollStrategyOptions);
  private readonly store = inject(Store);
  private readonly actionSubject = inject(ActionsSubject);
  private readonly snackbar = inject(MatSnackBar);
  public readonly previousText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  /**
   * INFO:
   * dialogConfigHappen - responsible to config dialog to happen create
   *
   * @param data Dialog
   * @returns DialogRef
   */
  public dialogConfigHappen(data: dialogData<ProfileHappen>) {
    return {
      panelClass: 'dialog-custom',
      scrollStrategy: this.scrollStrategy.noop(),
      width: '100%',
      height: '100%',
      maxWidth: '920px',
      maxHeight: '768px',
      data,
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
    this.store.dispatch(happenPostLocal({ index: index, data }));

    return this.listeningEvent(index, data, SnackBarActions.create, createLocal);
  }

  /**
   * INFO:
   * listeningError - responsible to listening some error comes from backend service
   *
   * @returns void or throw Error
   */
  public listeningError() {
    return this.store.select(selectHappenError).pipe(
      filter((error) => !!error),
      map((e) => {
        throw new Error(e?.error);
      })
    );
  }

  /**
   * INFO:
   * open snackbar to show option to cancel before delete on remote serve
   * @param happen ProfileHappen (required)
   * @returns Observable<boolean>
   */
  public openSnackerbar(index: number, data: ProfileHappen, action: SnackBarActions) {
    return this.snackbar
      .open(`${data.whatHappen.substring(0, 20)}...`, 'cancelar', { duration: 2000 })
      .afterDismissed()
      .pipe(concatMap(({ dismissedByAction }) => this.executeActions(index, dismissedByAction, data)[action]()));
  }

  /**
   * INFO:
   * listeningEvent - responsible to listening action actions types
   *
   * @param actionType string (required)
   */
  private listeningEvent(index: number, data: ProfileHappen, action: SnackBarActions, actionType: string) {
    return this.actionSubject.pipe(
      filter(({ type }) => type === actionType),
      first(),
      concatMap(() => this.openSnackerbar(index, data, action))
    );
  }

  /**
   * INFO:
   * executeActions - execute action according by type
   *
   * @param isDismissed boolean (required)
   * @param data ProfileHappen
   * @returns Observable
   */
  private executeActions(index: number, isDismissed: boolean, data: ProfileHappen) {
    return {
      [SnackBarActions.create]: () => this.createOrCancel(index, isDismissed, data),
      [SnackBarActions.update]: () => this.updateOrCancel(index, isDismissed, data),
      [SnackBarActions.delete]: () => this.removeOrCancel(index, isDismissed, data),
    };
  }

  /**
   * INFO:
   * removeOrCancel - responsible to excluir on backend or cancel
   *
   * @param dismissedByAction boolean
   * @param happen ProfileHappen
   * @returns null or Error
   */
  private removeOrCancel(index: number, dismissedByAction: boolean, data: ProfileHappen) {
    if (dismissedByAction) {
      this.store.dispatch(happenDeleteRollback({ index, data }));
      return of();
    } else {
      this.store.dispatch(happenDeleteRemote({ index, data }));
      return this.listeningError();
    }
  }

  /**
   * INFO:
   * createOrCancel - responsible to excluir on backend or cancel
   *
   * @param dismissedByAction boolean
   * @param happen ProfileHappen
   * @returns null or Error
   */
  private createOrCancel(index: number, dismissedByAction: boolean, data: ProfileHappen) {
    if (dismissedByAction) {
      this.store.dispatch(happenPostRollback({ index, data }));
      return of();
    } else {
      this.store.dispatch(happenPostRemote({ index, data }));
      return this.listeningError();
    }
  }

  /**
   * INFO:
   * updateOrCancel - responsible to excluir on backend or cancel
   *
   * @param dismissedByAction boolean
   * @param happen ProfileHappen
   * @returns null or Error
   */
  private updateOrCancel(index: number, dismissedByAction: boolean, data: ProfileHappen) {
    if (dismissedByAction) {
      this.store.dispatch(
        happenUpdateRollback({
          index,
          data: { ...data, whatHappen: this.previousText$.getValue() },
        })
      );
      return of();
    } else {
      this.store.dispatch(happenUpdateRemote({ index, data }));
      return this.listeningError();
    }
  }
}
