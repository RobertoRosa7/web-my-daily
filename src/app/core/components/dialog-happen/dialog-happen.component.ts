import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileHappen } from '../../../pages/profile/core/interfaces/profile.happen.interface';
import { dialogData } from '../../../interface/dialogs.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectorTheme } from '../../selectors/color.selector';

@Component({
  selector: 'app-dialog-happen',
  templateUrl: './dialog-happen.component.html',
  styleUrl: './dialog-happen.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class DialogHappenComponent implements OnInit {
  public readonly theme$ = this.store.select(selectorTheme);
  public form: FormControl = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: dialogData<ProfileHappen>, private readonly store: Store) {}

  ngOnInit(): void {
    const { data } = this.data;
    this.form.setValue(data.whatHappen);
  }

  public get totalLength() {
    return this.form.value.length;
  }
}
