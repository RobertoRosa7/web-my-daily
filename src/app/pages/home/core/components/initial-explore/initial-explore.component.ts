import { CommonModule } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-initial-explore',
  templateUrl: './initial-explore.component.html',
  styleUrls: ['./initial-explore.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
})
export class InitialExploreComponent {
  constructor() {}
}
