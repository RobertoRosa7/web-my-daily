import { Injectable } from '@angular/core';
import { ILogin, IRegister, loginResponse, registerResponse } from '../interfaces/auth.interface';
import { clearText } from '../../../../utils/regex/utils.regex.validators';
import { Observable } from 'rxjs';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  /**
   * INFO:
   * login - responsible to call repository to make login
   *
   * @param param ILogin
   * @returns Observable<loginResponse>
   */
  public login({ password, email }: ILogin): Observable<loginResponse> {
    email = clearText(email);
    password = clearText(password);

    return this.authRepository.login({ password, email });
  }

  /**
   * INFO:
   * register - responsible to create new user
   *
   * @param payload IRegister
   * @returns Observable<registerResponse>
   */
  public register(payload: IRegister): Observable<registerResponse> {
    clearText(payload.nameId);
    clearText(payload.email);

    return this.authRepository.register(payload);
  }
}
