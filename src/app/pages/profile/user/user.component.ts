import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { Store } from '@ngrx/store';
import { actionColor } from '../core/actions/color.action';
import { selectorTheme } from '../core/selectors/color.selector';
import { stringType } from '../core/types/color.type';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends Profile implements OnInit {
  public theme$ = this.store.select(selectorTheme);
  constructor(private readonly activeRouter: ActivatedRoute, protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.activeRouter.queryParamMap.pipe(map((params) => params.get('name'))).subscribe(console.log);

    this.store.dispatch(
      actionColor({
        theme: 'profile',
        background: stringType.profileCover,
      })
    );
  }
}
