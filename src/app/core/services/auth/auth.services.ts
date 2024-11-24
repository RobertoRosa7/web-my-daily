import { Injectable } from '@angular/core';
import { ILogin, IRegister, loginResponse, registerResponse } from '../../interfaces/auth/auth.interface';
import { clearText } from '../../../utils/regex/utils.regex.validators';
import { Observable, map } from 'rxjs';
import { AuthRepository } from '../../repositories/auth/auth.repository';
import { LocalStorageService } from '../localstorages/localstorage.service';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import { User } from '../../interfaces/profile/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly localStorageService: LocalStorageService
  ) {}

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

    return this.authRepository.login({ password, email }).pipe(
      map((response) => ({
        ...response,
        data: {
          user: JsonMapProperties.deserialize(User, response.data?.user),
          token: response.data ? response.data.token : '',
        },
      }))
    );
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

  /**
   * INFO:
   * isSessionUser - check if user have session active
   * @returns boolean
   */
  public isSessionUser(): boolean {
    return !!this.localStorageService.token$.getValue();
  }

  /**
   * INFO:
   * clearSession - clear session from user
   */
  public clearSession(): void {
    this.localStorageService.clearAll();
  }
}
