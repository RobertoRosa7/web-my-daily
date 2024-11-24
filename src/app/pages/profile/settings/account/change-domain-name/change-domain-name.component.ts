import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NameIdComponent } from '../../../../../core/components/input-name-id/name-id.component';
import { AccountComponent } from '../account.component';
import { debounceTime, distinctUntilKeyChanged, map } from 'rxjs';
import { acLoading, acNameId } from '../../../../../core/actions/user/user.action';
import { selMessageOk, selMessageNok, selIsLoading } from '../../../../../core/selectors/user/user.selector';
import { MessageComponent } from '../../../../../core/components/messages/message.component';
import { CommonEnum } from '../../../../../core/enums/bases/base.enum';

@Component({
  selector: 'app-change-domain-name',
  templateUrl: './change-domain-name.component.html',
  styleUrl: './change-domain-name.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, NameIdComponent, MessageComponent],
})
export class ChangeDomainNameComponent extends AccountComponent {
  public readonly error$ = this.store.select(selMessageNok);
  public readonly success$ = this.store.select(selMessageOk);
  public readonly isLoading$ = this.store.select(selIsLoading);

  public override ngOnInit(): void {
    this.form = this.formBuilder.group({});

    this.form.valueChanges
      .pipe(
        this.takeUntilDestroy(),
        debounceTime(100),
        distinctUntilKeyChanged(this.fieldNames.nameId),
        map((value) => value.nameId)
      )
      .subscribe(this.updateNameId.bind(this));
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
      this.store.dispatch(acLoading({ isLoading: true }));
      this.store.dispatch(acNameId({ nameId: nameId + CommonEnum.daily }));
    }
  }
}
