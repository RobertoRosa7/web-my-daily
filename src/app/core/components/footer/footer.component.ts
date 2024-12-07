import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutePathsEnum } from '@enums/bases/base.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class FooterComponent {
  public routePathsEnum = RoutePathsEnum;

  public get getYear() {
    return new Date().getFullYear();
  }
}
