import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectName,
  selectorChangeNicknameNok,
  selectorIsUpdatingUser,
  selectorNicknameOk,
} from '../../core/selectors/user.selector';
import { actionColor } from '../../core/actions/color.action';
import { actionChangeNickName } from '../../core/actions/user.action';
import { MessageComponent } from '../../../../core/components/messages/message.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrl: './change-name.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, MessageComponent],
})
export class ChangeNameComponent implements OnInit {
  private store: Store = inject(Store);

  public error$ = this.store.select(selectorChangeNicknameNok);
  public isLoading$ = this.store.select(selectorIsUpdatingUser);
  public success$ = this.store.select(selectorNicknameOk);

  public form: FormControl = new FormControl();

  ngOnInit(): void {
    this.store.select(selectName).subscribe({
      next: (nickname) => this.form.setValue(nickname),
    });
    this.store.dispatch(actionColor({ theme: '' }));
  }

  public onSubmit() {
    this.store.dispatch(actionChangeNickName({ nickname: this.form.value.trim() }));
  }

  public onHide() {}
}
