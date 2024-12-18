import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { Store } from '@ngrx/store';
import { IAuthState } from '@interfaces/auth/auth.interface';
import { acLoading, acSendEmail } from '@actions/auth/auth.action';

@Component({
  selector: 'app-reset-password',
  styleUrls: ['./reset-password.component.scss'],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent extends AuthComponent implements OnInit {
  /**
   *
   * @param formBuilder
   * @param store
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

  /**
   *
   */
  public onSubmit(): void {
    this.store.dispatch(acLoading({ isLoading: true }));
    this.store.dispatch(acSendEmail(this.form.value));
  }
}
