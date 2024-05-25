import { Component } from '@angular/core';
import { HomeComponent } from '../home';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-feelingers',
  templateUrl: './feelingers.component.html',
  styleUrls: ['./feelingers.component.scss'],
  standalone: true,
})
export class FeelingersComponent extends HomeComponent {
  constructor(protected override readonly store: Store) {
    super(store);
  }
}
