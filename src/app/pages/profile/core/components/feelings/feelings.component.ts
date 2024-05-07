import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feelings',
  templateUrl: `./feelings.component.html`,
  styleUrl: './feelings.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
})
export class FeelingsComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`;
}
