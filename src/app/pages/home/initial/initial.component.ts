import { Component, OnInit } from '@angular/core';
import { selectorTheme } from '../../profile/core/selectors/color.selector';
import { HomeComponent } from '../home';
import { Store } from '@ngrx/store';
import { actionColor } from '../../profile/core/actions/color.action';
import { stringType } from '../../profile/core/types/color.type';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss'],
})
export class InitialComponent extends HomeComponent implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(
      actionColor({
        theme: 'home',
        background: stringType.profileCover,
      })
    );
  }
}
