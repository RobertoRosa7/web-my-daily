import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { FormControl } from '@angular/forms';
import {
  selGetNickname,
  selMessageOk,
  selIsLoading,
  selMessageNok,
} from '../../../../../core/selectors/user/user.selector';
import { actionColor } from '../../../../../core/actions/color/color.action';
import { acNickname } from '../../../../../core/actions/user/user.action';
import { AccountComponent } from '../account.component';
import { MessageComponent } from '../../../../../core/components/messages/message.component';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrl: './change-name.component.scss',
  standalone: true,

  imports: [CommonModule, SharedModule, MessageComponent],
})
export class ChangeNameComponent extends AccountComponent {
  public readonly formControll: FormControl = new FormControl();

  public readonly error$ = this.store.select(selMessageNok);
  public readonly isLoading$ = this.store.select(selIsLoading);
  public readonly success$ = this.store.select(selMessageOk);

  override ngOnInit(): void {
    this.store.dispatch(actionColor({ theme: '' }));

    this.store
      .select(selGetNickname)
      .pipe(this.takeUntilDestroy())
      .subscribe({
        next: (nickname) => this.formControll.setValue(nickname),
      });
  }

  public override onSubmit() {
    this.store.dispatch(acNickname({ nickname: this.formControll.value.trim() }));
  }

  public onHide() {}
}
