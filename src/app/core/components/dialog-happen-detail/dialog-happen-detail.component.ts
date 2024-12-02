import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SnackBarActions, dialogData } from '../../interfaces/dialogs/dialogs.interface';
import { HappenVisibility, ProfileHappen } from '../../interfaces/happens/profile.happen.interface';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FollowerPipe } from '../../pipes/followers/follwers.pipe';
import { Store } from '@ngrx/store';
import { DialogService } from '../../services/dialogs/dialog.service';
import { DialogHelperService } from '../../services/dialogs/dialog-helper.service';
import { actionDislikedLocal, actionLikedLocal } from '../../actions/happen/likes.action';
import { selectHappenActive } from '../../selectors/happens/profile.happens.selector';

@Component({
  selector: 'app-dialog-happen-detail',
  templateUrl: './dialog-happen-detail.component.html',
  styleUrl: './dialog-happen-detail.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, FollowerPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHappenDetailCompoent implements OnInit {
  @ViewChild('donuts')
  public readonly donuts!: ElementRef;
  public readonly visibility = HappenVisibility;

  // public happen = this.data.data.data;
  public happen$ = this.store.select(selectHappenActive);

  constructor(private readonly store: Store, private readonly dialogService: DialogService) {}

  ngOnInit(): void {}
  public disliked(disliked: boolean, index: number, happen: ProfileHappen): void {
    // previous like to rollback
    DialogHelperService.previousDisLike$.next(!disliked);

    // builder like request
    const builder = (value: boolean) => ({
      index,
      request: DialogHelperService.dislikeBuilder(value, happen),
    });

    // dispatch like local
    this.store.dispatch(actionDislikedLocal(builder(disliked)));

    // open snackabar
    this.dialogService.openSnackerbar(index, happen, SnackBarActions.disliked).subscribe({
      next: (_) => {},
      error: (error) => {
        this.dialogService.showSnackbar(error, 'Não foi possível curtir este post');
        this.store.dispatch(actionDislikedLocal(builder(disliked)));
      },
    });
  }

  public liked(liked: boolean, index: number, happen: ProfileHappen): void {
    // previous like to rollback
    DialogHelperService.previousLike$.next(!liked);

    // builder like request
    const builder = (value: boolean) => ({
      index,
      request: DialogHelperService.likedBuilder(value, happen),
    });

    // dispatch like local
    this.store.dispatch(actionLikedLocal(builder(liked)));

    // open snackabar
    this.dialogService.openSnackerbar(index, happen, SnackBarActions.liked).subscribe({
      next: (_) => {},
      error: (error) => {
        this.dialogService.showSnackbar(error, 'Não foi possível curtir este post');
        this.store.dispatch(actionLikedLocal(builder(liked)));
      },
    });
  }
  // ngAfterViewInit(): void {
  //   Highcharts.chart(this.donuts.nativeElement, {
  //     chart: {
  //       height: '350px',
  //     },
  //     title: {
  //       text: '',
  //       align: 'left',
  //     },
  //     tooltip: {
  //       headerFormat: '',
  //       pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' + '{point.name}</b><br/>',
  //     },
  //     plotOptions: {
  //       pie: {
  //         dataLabels: {
  //           enabled: true,
  //           distance: -50,
  //           style: {
  //             fontWeight: 'bold',
  //             color: 'white',
  //           },
  //         },
  //         startAngle: -90,
  //         endAngle: 90,
  //         center: ['50%', '75%'],
  //         size: '110%',
  //       },
  //     },
  //     credits: {
  //       enabled: false,
  //     },
  //     legend: { enabled: false },
  //     series: [
  //       {
  //         type: 'pie',
  //         innerSize: '50%',
  //         data: [
  //           {
  //             name: 'Positivo',
  //             y: this.data.data.feelings.scorePositive,
  //           },
  //           {
  //             name: 'Negativo',
  //             y: this.data.data.feelings.scoreNegative,
  //           },
  //         ],
  //         colors: ['#28a74545', '#dc354545'],
  //       },
  //     ],
  //   });
  // }
}
