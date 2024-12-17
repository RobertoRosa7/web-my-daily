import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Public } from '../public';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { pageableProfilePublicMock } from '../../../mock/profile.mock';
import { User } from '../../../core/interfaces/profile/profile.interface';
import { selPageableError, selPageablePub } from '../../../core/selectors/public/public-profile.selector';
import { actionProfilePublic, actionUserFollow } from '../../../core/actions/public/public-profile.action';
import { FollowRequest } from '../../../core/interfaces/follows/follow.interface';
import * as Highcharts from 'highcharts';
import { backgroundType } from '../../../core/types/colors/color.type';
import { acColor } from '../../../core/actions/color/color.action';
import { PageableUser } from '@interfaces/pageables/pageable.interface';
import { PathResources } from '@enums/bases/base.enum';

@Component({
  selector: 'app-profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends Public implements OnInit {
  @ViewChild('charts', { static: true })
  public charts!: ElementRef;

  public readonly mock = pageableProfilePublicMock as Array<User>;
  public readonly userPageble$ = this.store.select(selPageablePub).pipe(map((res) => res.content));
  public readonly error$ = this.store.select(selPageableError);

  public highcharts = Highcharts;
  public options = {
    chart: {
      type: 'variablepie',
    },
    title: {
      text: 'Countries compared by population density and total area, 2022.',
      align: 'left',
    },
    tooltip: {
      headerFormat: '',
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> ' +
        '{point.name}</b><br/>' +
        'Area (square km): <b>{point.y}</b><br/>' +
        'Population density (people per square km): <b>{point.z}</b><br/>',
    },
    series: [
      {
        minPointSize: 10,
        innerSize: '20%',
        zMin: 0,
        name: 'countries',
        borderRadius: 5,
        data: [
          {
            name: 'Spain',
            y: 505992,
            z: 92,
          },
          {
            name: 'France',
            y: 551695,
            z: 119,
          },
          {
            name: 'Poland',
            y: 312679,
            z: 121,
          },
          {
            name: 'Czech Republic',
            y: 78865,
            z: 136,
          },
          {
            name: 'Italy',
            y: 301336,
            z: 200,
          },
          {
            name: 'Switzerland',
            y: 41284,
            z: 213,
          },
          {
            name: 'Germany',
            y: 357114,
            z: 235,
          },
        ],
        colors: ['#4caefe', '#3dc3e8', '#2dd9db', '#1feeaf', '#0ff3a0', '#00e887', '#23e274'],
      },
    ],
  };

  constructor(protected override readonly store: Store) {
    super(store);
  }

  override ngOnInit(): void {
    this.store.dispatch(actionProfilePublic({ name: null }));
    this.store.dispatch(
      acColor({
        theme: 'public',
      })
    );
  }

  public onSocketio(event: FollowRequest) {
    this.store.dispatch(actionUserFollow(event));
  }

  /**
   * Data retrieved from https://worldpopulationreview.com/country-rankings/countries-by-density
   */
  public initializeChart() {}
}
