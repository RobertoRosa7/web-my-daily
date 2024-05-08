import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profileObservable } from '../../interfaces/profile.interface';
import { selectorProfile } from '../../selectors/profile.selector';
import { Store } from '@ngrx/store';
import { FollowerPipe } from '../../../../../core/pipes/follwers.pipe';

@Component({
  selector: 'app-follwers',
  styleUrl: './followers.component.scss',
  templateUrl: './followers.component.html',
  standalone: true,
  imports: [CommonModule, FollowerPipe],
})
export class FollowersComponent {
  public userProfile$: profileObservable = this.store.select(selectorProfile);

  constructor(private readonly store: Store) {}
}
