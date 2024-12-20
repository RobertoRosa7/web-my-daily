import { Component, inject } from '@angular/core';
import { AccountComponent } from '../account.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@services/dialogs/dialog.service';
import { ProfileService } from '@services/profile/profile.service';
import { AuthService } from '@services/auth/auth.services';
import { selMessage } from '@selectors/user/user.selector';
import { DialogAlertComponent } from '@components/dialog-alert/dialog-alert.component';
import { DialogActions, DialogAlert } from '@interfaces/dialogs/dialogs.interface';
import { catchError, delay, mergeMap, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutePathsEnum } from '@enums/bases/base.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrl: './menu-account.component.scss',
})
export class MenuAccountComponent extends AccountComponent {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly dialogService = inject(DialogService);
  private readonly profileService = inject(ProfileService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public readonly message$ = this.store.select(selMessage);

  /**
   *
   */
  public get dialogOpen(): MatDialogRef<DialogAlertComponent, boolean> {
    const dialogData = new DialogAlert();
    const dialogAction = new DialogActions();
    dialogData.title = 'Vai excluir sua conta?';
    dialogData.message = 'Todos os seus dados serão apadados.';
    dialogAction.messageAction = 'Excluir';
    dialogAction.messageClose = 'Cancelar';
    dialogData.actions = dialogAction;
    return this.dialog.open(DialogAlertComponent, this.dialogService.dialogConfig(dialogData));
  }

  /**
   *
   */
  public onDelete(): void {
    this.dialogOpen
      .afterClosed() // Layer - after dialog close start operation
      .pipe(
        mergeMap((resp) => this.handlerDeleteProfile(!!resp)), // Layer - http request if not null response
        this.takeUntilDestroy() // Layer - ondestroy unsubscribe
      )
      .subscribe();
  }

  /**
   *
   * @param resp
   * @returns
   */
  private handlerDeleteProfile(resp: boolean) {
    if (!resp) {
      return of(null);
    }

    // Inicia o processo de exclusão
    this.showMessage('Excluindo... aguarde até terminar', 'info');

    return this.userId$.pipe(
      // Layer - handler with success delete
      switchMap((id) => this.deleteProfile(id as string)),
      // Layer - handler error from Http
      catchError(({ error }: HttpErrorResponse) => this.handleError(error))
    );
  }

  /**
   * Método para excluir o perfil
   * @param id
   * @returns
   */
  private deleteProfile(id: string) {
    return this.profileService.deleteProfile(id).pipe(
      delay(1000), // Simula tempo de espera
      tap(() => this.showMessage('Sua conta foi excluída com sucesso.', 'success')),
      delay(2000), // Atraso para refletir a exclusão
      tap(() => {
        this.authService.clearSession();
        this.showMessage('Encerrando sua sessão, aguarde...', 'info');
      }),
      delay(3000), // Atraso para finalizar sessão
      tap(() => this.finalizeProcess())
    );
  }

  /**
   * Finaliza o processo e redireciona
   */
  private finalizeProcess(): void {
    this.clearMessage();
    this.router.navigateByUrl(RoutePathsEnum.routePublicArea);
  }

  /**
   * Lida com erros
   *
   * @param error HttpErrorResponse
   * @returns Observable<null>
   */
  private handleError(error: HttpErrorResponse) {
    this.showMessage(error?.message, 'error');
    return of(null);
  }
}
