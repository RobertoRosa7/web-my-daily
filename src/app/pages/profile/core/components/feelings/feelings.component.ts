import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import localePt from '@angular/common/locales/pt';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-feelings',
  templateUrl: `./feelings.component.html`,
  styleUrl: './feelings.component.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: LOCALE_ID, useValue: 'pt' },
  ],
})
export class FeelingsComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`;
}
