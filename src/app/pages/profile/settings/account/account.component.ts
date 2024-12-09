import { Component, inject } from '@angular/core';
import { SettingComponent } from '../setting.component';
import { selMessage } from '@selectors/user/user.selector';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAlertComponent } from '@components/dialog-alert/dialog-alert.component';
import { DialogActions, DialogAlert } from '@interfaces/dialogs/dialogs.interface';
import { DialogService } from '@services/dialogs/dialog.service';
import { catchError, delay, mergeMap, of, switchMap, tap } from 'rxjs';
import { ProfileService } from '@services/profile/profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RoutePathsEnum } from '@enums/bases/base.enum';
import { AuthService } from '@services/auth/auth.services';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent extends SettingComponent {
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly dialogService = inject(DialogService);
  private readonly profileService = inject(ProfileService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public readonly labelButtonSubmit = 'Salvar Alteração';
  public readonly msgUpdating = 'Atualizando...';
  public readonly typeInfo = 'info';
  public readonly typeSuccess = 'success';
  public readonly typeError = 'error';
  public readonly message$ = this.store.select(selMessage);

  public onSubmit() {}
  public onDeactivateAccount() {}
  public onDeleteAccount() {}

  /**
   * getNameId = get name field from form
   */
  public get getNameId() {
    return this.form.get(this.fieldNames.nameId)?.value;
  }

  /**
   * isNameIdValid = get name field from form is valid to submit
   */
  public get isNameIdValid() {
    return this.form.get(this.fieldNames.nameId)?.valid;
  }

  /**
   * getNickname = get name field from form is valid to submit
   */
  public get getNickname() {
    return this.form.get(this.fieldNames.nickname)?.value;
  }

  /**
   * isNicknameValid = get name field from form is valid to submit
   */
  public get isNicknameValid() {
    return this.form.get(this.fieldNames.nickname)?.valid;
  }

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

  public onDelete(): void {
    this.dialogOpen
      .afterClosed() // Layer - after dialog close start operation
      .pipe(
        mergeMap((resp) => this.handlerDeleteProfile(!!resp)), // Layer - http request if not null response
        this.takeUntilDestroy() // Layer - ondestroy unsubscribe
      )
      .subscribe();
  }

  private handlerDeleteProfile(resp: boolean) {
    if (!resp) {
      return of(null);
    }

    // Inicia o processo de exclusão
    this.showMessage('Excluindo... aguarde até terminar', 'info');
    return this.userId$.pipe(
      switchMap((id) => this.deleteProfile(id as string)),
      catchError(({ error }: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Método para excluir o perfil
  private deleteProfile(id: string) {
    return this.profileService.deleteProfile(id).pipe(
      delay(1000), // Simula tempo de espera
      tap(() => this.showMessage('Sua conta foi excluída com sucesso.', 'success')),
      delay(3000), // Atraso para refletir a exclusão
      tap(() => {
        this.authService.clearSession();
        this.showMessage('Encerrando sua sessão, aguarde...', 'info');
      }),
      delay(3000), // Atraso para finalizar sessão
      tap(() => this.finalizeProcess())
    );
  }

  // Finaliza o processo e redireciona
  private finalizeProcess() {
    this.clearMessage();
    this.router.navigateByUrl(RoutePathsEnum.publicArea);
  }

  // Lida com erros
  private handleError(error: any) {
    this.showMessage(error.message, 'error');
    return of(null);
  }
}
