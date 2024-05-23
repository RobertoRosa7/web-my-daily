import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone: true,
})
export class TimelineComponent implements OnInit {
  private readonly homeService: HomeService = inject(HomeService);

  ngOnInit(): void {
    // this.homeService.getTimeline().subscribe(console.log);
  }
}
