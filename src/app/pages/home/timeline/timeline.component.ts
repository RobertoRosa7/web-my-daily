import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeComponent } from '../home';
import { ProfileHappenObservable } from '../../../core/interfaces/happens/profile.happen.interface';
import { selectorHappens } from '../../../core/selectors/happens/profile.happens.selector';
import { isPlatformBrowser } from '@angular/common';
import { happenTimeline } from '../../../core/actions/happens/profile.happens.action';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent extends HomeComponent implements OnInit {
  public timeline$: ProfileHappenObservable = this.store.select(selectorHappens);

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      this.store.dispatch(happenTimeline());
    }
  }
}
