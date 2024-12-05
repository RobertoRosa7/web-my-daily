import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  templateUrl: './privacy-policy.component.html',
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
export class PrivacyPolicyComponent {}
