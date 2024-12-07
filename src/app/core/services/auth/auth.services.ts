import { Injectable } from '@angular/core';
import { AuthVars, ILogin, IRegister, loginResponse, registerResponse } from '../../interfaces/auth/auth.interface';
import { clearText } from '../../../utils/regex/utils.regex.validators';
import { Observable, map } from 'rxjs';
import { AuthRepository } from '../../repositories/auth/auth.repository';
import { LocalStorageService } from '../localstorages/localstorage.service';
import { JsonMapProperties } from '../../decorators/jsons/json.decorator';
import { User } from '../../interfaces/profile/profile.interface';
import { IData } from '@interfaces/localstorages/localstorage.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly localStorageService: LocalStorageService
  ) {}

  /**
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
   * isSessionUser - check if user have session active
   * @returns boolean
   */
  public isSessionUser(): boolean {
    return !!this.localStorageService.token$.getValue();
  }

  /**
   * isSessionUser - check if user have session active
   * @returns boolean
   */
  public isSessionUserObservable(): Observable<boolean> {
    return this.localStorageService.getKeyObservable<boolean>(AuthVars.token).pipe(map((token) => !!token));
  }

  /**
   * clearSession - clear session from user
   */
  public clearSession(): void {
    this.localStorageService.clearAll();
  }

  public setKey<T>(key: string, data: IData<T>) {
    this.localStorageService.setKey(key, data);
  }
}
