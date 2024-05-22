import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HappenVisibility, ProfileHappen } from '../../../pages/profile/core/interfaces/profile.happen.interface';
import { dialogData } from '../../../interfaces/dialogs.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../selectors/color.selector';
import { User } from '../../../pages/profile/core/interfaces/profile.interface';
import { Observable } from 'rxjs';
import { selectorUser } from '../../../pages/profile/core/selectors/user.selector';

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
  public readonly theme$ = this.store.select(selectorTheme);
  public readonly form: FormControl = new FormControl('');
  public readonly visibility: FormControl = new FormControl(HappenVisibility.PRIVATE);

  constructor(@Inject(MAT_DIALOG_DATA) public data: dialogData<ProfileHappen>) {}

  ngOnInit(): void {
    const { data } = this.data;
    this.form.setValue(data.whatHappen);
  }

  public get totalLength() {
    return this.form.value.length;
  }

  public get getVisibility() {
    return this.visibility.value;
  }

  public get getText() {
    return this.form.value;
  }

  public close(user: User) {
    this.dialogRef.close(this.buildNewHappen(user));
  }

  public buildNewHappen(user: User | null): ProfileHappen {
    const happen = new ProfileHappen();

    if (user) {
      happen.userId = user?.id || '';
      happen.nameId = user?.nameId || '';
    }

    happen.whatHappen = this.getText || '';
    happen.visibility = this.getVisibility;

    console.log(happen);

    return happen;
  }
}
