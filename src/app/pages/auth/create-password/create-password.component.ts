import { Component, OnInit } from '@angular/core';
import { AuthComponent } from '../auth.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState } from '@interfaces/auth/auth.interface';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent extends AuthComponent implements OnInit {
  /**
   *
   * @param formBuilder FormBuilder form react
   * @param store Store - layer redux store where are all data storagered
   */
  constructor(private readonly formBuilder: FormBuilder, protected override readonly store: Store<IAuthState>) {
    super(store);
  }

  /**
   *
   */
  public ngOnInit(): void {
    // create new instance form group
    this.form = this.formBuilder.group({});

    // clear form when some error happens
    this.form.valueChanges.subscribe(() => this.store.dispatch(this.clearAction()));
  }
}
