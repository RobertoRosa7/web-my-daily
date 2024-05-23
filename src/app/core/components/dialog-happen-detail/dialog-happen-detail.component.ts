import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogData } from '../../interfaces/dialogs/dialogs.interface';
import { HappenVisibility, ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import * as Highcharts from 'highcharts';
import { FollowerPipe } from '../../pipes/followers/follwers.pipe';

@Component({
  selector: 'app-dialog-happen-detail',
  templateUrl: './dialog-happen-detail.component.html',
  styleUrl: './dialog-happen-detail.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, FollowerPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHappenDetailCompoent implements OnInit, AfterViewInit {
  @ViewChild('donuts')
  public readonly donuts!: ElementRef;

  public readonly visibility = HappenVisibility;

  public get classSentiments() {
    return {
      sad: this.data.data.feelings.sentiment === 'negative',
      happy: this.data.data.feelings.sentiment === 'positive',
    };
  }

  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: dialogData<ProfileHappen>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    Highcharts.chart(this.donuts.nativeElement, {
      chart: {
        height: '350px',
      },
      title: {
        text: '',
        align: 'left',
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' + '{point.name}</b><br/>',
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
            },
          },
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '110%',
        },
      },
      credits: {
        enabled: false,
      },
      legend: { enabled: false },
      series: [
        {
          type: 'pie',
          innerSize: '50%',
          data: [
            {
              name: 'Positivo',
              y: this.data.data.feelings.scorePositive,
            },
            {
              name: 'Negativo',
              y: this.data.data.feelings.scoreNegative,
            },
          ],
          colors: ['#28a74545', '#dc354545'],
        },
      ],
    });
  }
}
