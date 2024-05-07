import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { Store } from '@ngrx/store';
import { actionColor } from '../core/actions/color.action';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent extends Profile implements OnInit {
  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(actionColor({ theme: 'settings' }));
  }
}
