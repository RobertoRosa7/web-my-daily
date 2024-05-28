import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { HappenVisibility, ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../selectors/colors/color.selector';
import { User } from '../../../pages/profile/core/interfaces/profile.interface';
import { Observable, combineLatest, tap } from 'rxjs';
import { selectorUser } from '../../../pages/profile/core/selectors/user.selector';
import { selectHappenActive } from '../../selectors/happens/profile.happens.selector';

@Component({
  selector: 'app-dialog-happen',
  templateUrl: './dialog-happen.component.html',
  styleUrl: './dialog-happen.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class DialogHappenComponent implements OnInit {
  public readonly happenVisibilty = HappenVisibility;

  private readonly store: Store = inject(Store);
  private readonly dialogRef = inject(MatDialogRef<DialogHappenComponent>);

  public readonly user$: Observable<User | undefined> = this.store.select(selectorUser);
  public readonly happen$ = this.store.select(selectHappenActive);

  public comb$ = combineLatest({ user: this.user$, happen: this.happen$ }).pipe(
    tap(({ happen }) => {
      this.form.setValue(happen.happenActive.whatHappen);
      this.visibility.setValue(happen.happenActive.visibility);
    })
  );

  public readonly theme$ = this.store.select(selectorTheme);
  public readonly form: FormControl = new FormControl('');
  public readonly visibility: FormControl = new FormControl(HappenVisibility.PRIVATE);

  ngOnInit(): void {}

  public get totalLength() {
    return this.form.value.length;
  }

  public get getVisibility() {
    return this.visibility.value;
  }

  public get getText() {
    return this.form.value;
  }

  public close(user?: User) {
    this.dialogRef.close(this.buildNewHappen(user));
  }

  public buildNewHappen(user?: User | null): ProfileHappen {
    const happen = new ProfileHappen();

    if (user) {
      happen.userId = user?.id || '';
      happen.nameId = user?.nameId || '';
    }

    happen.whatHappen = this.getText || '';
    happen.visibility = this.getVisibility;

    return happen;
  }
}
