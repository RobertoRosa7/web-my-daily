import { Component } from '@angular/core';
import { Profile } from '../profile';
import { actionColor } from '../core/actions/color.action';

@Component({
  selector: 'app-settings',
  template: ` <router-outlet></router-outlet> `,
  styleUrl: './setting.component.scss',
})
export class SettingComponent extends Profile {
  override ngOnInit(): void {
    this.store.dispatch(actionColor({ theme: 'settings' }));
  }
}
