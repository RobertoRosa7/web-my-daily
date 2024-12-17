import { Component, OnInit } from '@angular/core';
import { AuthComponent } from '../auth.component';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAuthState } from '@interfaces/auth/auth.interface';
import { acCreatePass, acLoading } from '@actions/auth/auth.action';
import { ActivatedRoute, Params } from '@angular/router';
import { acShowMessage } from '@actions/message/message.action';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss',
})
export class CreatePasswordComponent extends AuthComponent implements OnInit {
  private accessToken!: string;

  /**
   *
   * @param formBuilder FormBuilder form react
   * @param store Store - layer redux store where are all data storagered
   */
  constructor(
    protected override readonly store: Store<IAuthState>,
    private readonly formBuilder: FormBuilder,
    private readonly activeRoute: ActivatedRoute
  ) {
    super(store);
  }

  /**?
   *
   */
  public ngOnInit(): void {
    // create new instance form group
    this.form = this.formBuilder.group({});

    // clear form when some error happens
    this.form.valueChanges.subscribe(() => this.store.dispatch(this.clearAction()));

    this.activeRoute.queryParams.subscribe({
      next: (value: Params) => (this.accessToken = value['accessToken'] as string),
    });
  }

  /**
   *
   */
  public onSubmit(): void {
    if (!this.accessToken) {
      this.store.dispatch(
        acShowMessage({
          body: {
            type: 'error',
            show: true,
            message: 'Token de Acesso é obrigatório pela URL',
          },
        })
      );
    }
    this.store.dispatch(acLoading({ isLoading: true }));
    this.store.dispatch(
      acCreatePass({
        password: this.form.value.password,
        token: this.accessToken,
      })
    );
  }
}
