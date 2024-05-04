import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { Store } from '@ngrx/store';
import { actionColor } from '../core/actions/color.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends Profile implements OnInit {
  
  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(actionColor({ background: 'black' }));
  }
}
