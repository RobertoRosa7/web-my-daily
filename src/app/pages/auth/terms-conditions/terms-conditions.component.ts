import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  templateUrl: './terms-conditions.component.html',
  styles: `
    main {
      padding: 1rem;
      text-align: justify;
    }
    strong {
      font-weight: 500;
    }
  `,
})
export class TermsConditionComponent {}
