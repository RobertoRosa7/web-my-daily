import { Injectable } from '@angular/core';
import { ILogin, IRegister } from '../interfaces/auth.interface';
import { clearText } from '../../../utils/regex/utils.regex.validators';
import { LocalStorageService } from '../../../../services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _localStorage: LocalStorageService) {}

  login(payload: ILogin) {
    clearText(payload.email);
    clearText(payload.password);

    this._localStorage.setKey('user', { data: payload });
  }

  register(payload: IRegister) {
    clearText(payload.nameId);
    clearText(payload.email);
  }
}
