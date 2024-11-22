import { Injectable } from '@angular/core';
import { ILogin, IRegister, loginResponse, registerResponse } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { Paths } from '../../../../core/enums/bases/base.enum';
import { Url } from '../../../../core/decorators/urls/url.decorator';
import { BaseRepository } from './base.respository';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository extends BaseRepository {
  @Url(Paths.pathPostSignin)
  private signin!: string;

  @Url(Paths.pathPostSignup)
  private signup!: string;

  /**
   * INFO:
   * login - this is responsible to make call http and make login
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public login(payload: ILogin): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.signin, payload);
  }

  /**
   * INFO:
   * register - this is responsible to make call http and make register
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public register(payload: IRegister): Observable<registerResponse> {
    return this.http.post<registerResponse>(this.signup, payload);
  }
}
