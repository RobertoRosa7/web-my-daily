import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-follwers',
  styleUrl: './followers.component.scss',
  template: `
    <div class="follow">
      <div class="followers">
        <p>2M</p>
        <p>seguidores</p>
      </div>
      <div class="follwing">
        <p>343.1M</p>
        <p>seguindo</p>
      </div>
      <div class="likes">
        <p>13.1K</p>
        <p>posts</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class FollowersComponent {}
