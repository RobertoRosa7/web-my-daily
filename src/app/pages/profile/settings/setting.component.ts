import { Component } from '@angular/core';
import { Profile } from '../profile';
import { acColor } from '@actions/color/color.action';

@Component({
  selector: 'app-settings',
  template: ` <router-outlet></router-outlet>`,
  styleUrl: './setting.component.scss',
})
export class SettingComponent extends Profile {
  public override ngOnInit(): void {
    this.store.dispatch(acColor({ theme: 'settings' }));
  }
}
