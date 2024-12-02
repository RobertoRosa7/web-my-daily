import { Component } from '@angular/core';
import { AccountComponent } from '../account.component';
import { acNickname } from '@actions/user/user.action';
import { actionLoading } from '@actions/auth/auth.action';
import { actionColor } from '@actions/color/color.action';
import { ShowMessage } from '@interfaces/message/message.interface';
import { acShowMessage } from '@actions/message/message.action';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrl: './change-name.component.scss',
})
export class ChangeNameComponent extends AccountComponent {
  public override ngOnInit(): void {
    this.store.dispatch(actionColor({ theme: 'settings' }));
    this.form = this.formBuilder.group({});
  }

  public override onSubmit(): void {
    if (this.isNicknameValid) {
      this.store.dispatch(acNickname({ nickname: this.getNickname }));
    }
  }
}
