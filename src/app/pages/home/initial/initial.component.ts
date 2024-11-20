import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home';
import { Store } from '@ngrx/store';
import { actionColor } from '../../profile/core/actions/color.action';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { backgroundType } from '../../../core/types/colors/color.type';
import { happenTimeline } from '../../../core/actions/happens/profile.happens.action';
import { actionProfilePublic } from '../../public/core/actions/public-profile.action';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent extends HomeComponent implements OnInit {
  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
    }
  }

  public onTabChange({ index }: MatTabChangeEvent): void {
    const tabIndex: any = {
      0: () => {
        this.store.dispatch(actionColor({ theme: 'home explore', background: backgroundType.profileCover }));
        this.store.dispatch(actionProfilePublic({ name: null }));
      },
      1: () => {
        this.store.dispatch(actionColor({ theme: 'home timeline' }));
        this.store.dispatch(happenTimeline());
      },
      2: () => this.store.dispatch(actionColor({ theme: 'home sentiment' })),
    };
    tabIndex[index]();
  }
}
