import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Public } from '../public';
import { selectorTheme } from '../../profile/core/selectors/color.selector';
import { actionColor } from '../../profile/core/actions/color.action';
import { stringType } from '../../profile/core/types/color.type';
import { ActivatedRoute } from '@angular/router';
import { Observable, exhaustMap, of } from 'rxjs';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends Public implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  public userPublicProfile$: Observable<any | null> = this.activeRoute.queryParamMap.pipe(
    exhaustMap((params) => {
      if (!params.get('name')) {
        return of(null);
      }
      return of(params.get('name'));
    })
  );

  constructor(protected override readonly store: Store, private readonly activeRoute: ActivatedRoute) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: stringType.publicProfileCover,
      })
    );
  }
}
