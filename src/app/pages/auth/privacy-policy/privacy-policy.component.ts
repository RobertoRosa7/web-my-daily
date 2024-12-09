import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '@components/footer/footer.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
  standalone: true,
  imports: [FooterComponent, ToolbarComponent, MatButtonModule],
})
export class PrivacyPolicyComponent {
  public printPdf(): void {
    window.print();
  }
}
