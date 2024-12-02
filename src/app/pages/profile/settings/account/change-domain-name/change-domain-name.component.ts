import { Component } from '@angular/core';
import { CommonEnum } from '@enums/bases/base.enum';
import { acNameId } from '@actions/user/user.action';
import { AccountComponent } from '../account.component';
import { actionColor } from '@actions/color/color.action';

@Component({
  selector: 'app-change-domain-name',
  templateUrl: './change-domain-name.component.html',
  styleUrl: './change-domain-name.component.scss',
})
export class ChangeDomainNameComponent extends AccountComponent {
  public override ngOnInit(): void {
    this.store.dispatch(actionColor({ theme: 'settings' }));
    this.form = this.formBuilder.group({});
  }

  /**
   * responsible to listen event to submit
   */
  public override onSubmit(): void {
    this.updateNameId(this.getNameId);
  }

  /**
   * responsible to call service to update nameId
   *
   * @param value string - value to update
   */
  private updateNameId(nameId: string): void {
    if (this.isNameIdValid) {
      this.store.dispatch(acNameId({ nameId: nameId + CommonEnum.daily }));
    }
  }
}
