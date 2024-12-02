import { Component } from '@angular/core';
import { SettingComponent } from '../setting.component';
import { selMessage } from '@selectors/user/user.selector';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent extends SettingComponent {
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
}
