import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectName,
  selectorChangeNicknameNok,
  selectorIsUpdatingUser,
  selectorNicknameOk,
} from '../../../core/selectors/user.selector';
import { actionColor } from '../../../core/actions/color.action';
import { actionChangeNickName } from '../../../core/actions/user.action';
import { MessageComponent } from '../../../../../core/components/messages/message.component';
import { AccountComponent } from '../account.component';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrl: './change-name.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, MessageComponent],
})
export class ChangeNameComponent extends AccountComponent {
  public readonly formControll: FormControl = new FormControl();

  public readonly error$ = this.store.select(selectorChangeNicknameNok);
  public readonly isLoading$ = this.store.select(selectorIsUpdatingUser);
  public readonly success$ = this.store.select(selectorNicknameOk);

  override ngOnInit(): void {
    this.store.dispatch(actionColor({ theme: '' }));

    this.store
      .select(selectName)
      .pipe(this.takeUntilDestroy())
      .subscribe({
        next: (nickname) => this.formControll.setValue(nickname),
      });
  }

  public override onSubmit() {
    this.store.dispatch(actionChangeNickName({ nickname: this.formControll.value.trim() }));
  }

  public onHide() {}
}
