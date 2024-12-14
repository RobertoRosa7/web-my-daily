import { Component } from '@angular/core';
import { AccountComponent } from '../account.component';
import { acColor } from '@actions/color/color.action';

@Component({
  selector: 'app-resume-user-info',
  templateUrl: './resume-user-info.component.html',
  styleUrl: './resume-user-info.component.scss',
})
export class ResumeUserInfoComponent extends AccountComponent {
  override ngOnInit(): void {
    this.store.dispatch(acColor({ theme: 'settings' }));
  }
}
