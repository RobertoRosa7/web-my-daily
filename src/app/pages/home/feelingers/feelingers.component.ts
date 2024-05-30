import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeComponent } from '../home';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-feelingers',
  templateUrl: './feelingers.component.html',
  styleUrls: ['./feelingers.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FeelingersComponent extends HomeComponent implements AfterViewInit {
  public showHighcharts: boolean = false;
  public isHighcharts = typeof Highcharts === 'object';
  public chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  public chartCallback: Highcharts.ChartCallbackFunction = function (chart) {}; // optional function, defaults to null
  public updateFlag: boolean = false; // optional boolean
  public oneToOneFlag: boolean = true; // optional boolean, defaults to false
  public runOutsideAngular: boolean = false; // optional boolean, defaults to false
  public Highcharts: typeof Highcharts = Highcharts; // required

  public chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
    },
    title: {
      text: 'Comparação de sentimentos Anual',
      align: 'left',
    },
    tooltip: {
      headerFormat: '{point.x}',
      pointFormat: '</br>{series.name} <b>{point.y:.2f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Porcentagem',
      },
      labels: {
        format: '{value}%',
      },
    },
    xAxis: {
      accessibility: {
        description: 'Meses do ano',
      },
      crosshair: true,
      categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
      },
    },
    series: [
      {
        color: '#EF201D',
        name: 'Positivo',
        type: 'column',
        data: [93.8899, 12.296, 32.5251, 13.8751, 12.8751],
      },
      {
        color: '#321D66',
        name: 'Negativo',
        type: 'column',
        data: [38.899, 22.96, 32.5251, 28.751, 52.8751],
      },
    ],
  }; // required

  constructor(protected override readonly store: Store) {
    super(store);
    // prevent error SSR (Server Side Render)
    if (isPlatformBrowser(this.platform)) {
      this.showHighcharts = true;
    }
  }

  ngAfterViewInit(): void {}
}
