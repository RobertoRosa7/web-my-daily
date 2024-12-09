import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '@components/footer/footer.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss',
  standalone: true,
  imports: [FooterComponent, ToolbarComponent, MatButtonModule],
})
export class TermsConditionComponent {
  public printPdf(): void {
    window.print();
  }
}
