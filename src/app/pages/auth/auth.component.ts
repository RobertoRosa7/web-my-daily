import { FormControl } from '@angular/forms';
export abstract class AuthComponent {
  email = new FormControl('');
  password = new FormControl('');
}


