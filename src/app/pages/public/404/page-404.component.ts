import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './page-404.component.scss',
  template: ` <main [ngClass]="theme" class="page-404">
    <div class="wrapper">
      <div class="container-404">
        <div class="text">
          <h1>OOps!</h1>
          <span>{{ message }}</span>
        </div>

        <div class="text">
          <h1>{{ messageTitle }}</h1>
        </div>
      </div>
    </div>
  </main>`,
})
export class Page404Component {
  @Input() public theme!: string | null;
  @Input() public messageTitle!: string;
  @Input() public message!: string;
}
