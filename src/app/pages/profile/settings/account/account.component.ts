import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingComponent } from '../setting.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent extends SettingComponent {
  private fb: FormBuilder = inject(FormBuilder);

  public userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    password: ['', Validators.required],
    profileVisibility: ['', Validators.required],
    blockedContacts: [''],
  });

  onSubmit() {}

  onDeactivateAccount() {}

  onDeleteAccount() {}
}
