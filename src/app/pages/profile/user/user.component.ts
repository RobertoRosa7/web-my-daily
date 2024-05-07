import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { Store } from '@ngrx/store';
import { actionColor } from '../core/actions/color.action';
import { selectorTheme } from '../core/selectors/color.selector';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends Profile implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: 'linear-gradient(-45deg, var(--dark) 20%, var(--bg-dark-blue) 80%, var(--primary) 5%)',
      })
    );
  }
}
