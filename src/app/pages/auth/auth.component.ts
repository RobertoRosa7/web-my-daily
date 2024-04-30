import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  template: '<router-outlet></router-outlet>',
})
export class AuthComponent {
  public form!: FormGroup;
  public suffix = '@daily';
  public changeTexts = true;
}
