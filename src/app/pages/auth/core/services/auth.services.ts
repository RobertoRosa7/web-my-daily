import { Injectable } from '@angular/core';
import { IAuthState, ILogin, IRegister } from '../interface/auth.interface';
import { clearText } from '../../../../utils/regex/utils.regex.validators';
import { Observable } from 'rxjs';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';
import { AuthRepository } from '../repository/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  login({ password, email }: ILogin): Observable<HttpResponseDefault<IAuthState>> {
    email = clearText(email);
    password = clearText(password);

    return this.authRepository.login({ password, email });
  }

  register(payload: IRegister): Observable<HttpResponseDefault<IAuthState>> {
    clearText(payload.nameId);
    clearText(payload.email);

    return this.authRepository.register(payload);
  }
}
