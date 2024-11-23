import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NameIdComponent } from '../../../../auth/core/components/input-name-id/name-id.component';
import { AccountComponent } from '../account.component';
import { debounceTime, distinctUntilKeyChanged, map } from 'rxjs';

@Component({
  selector: 'app-change-domain-name',
  templateUrl: './change-domain-name.component.html',
  styleUrl: './change-domain-name.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, NameIdComponent],
})
export class ChangeDomainNameComponent extends AccountComponent {
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
   * INFO:
   * responsible to listen event to submit
   */
  public override onSubmit(): void {
    this.updateNameId(this.getNameId);
  }

  /**
   * INFO:
   * responsible to call service to update nameId
   *
   * @param value string - value to update
   */
  private updateNameId(value: string): void {
    if (this.isNameIdValid) {
      console.log(value);
    }
  }
}
