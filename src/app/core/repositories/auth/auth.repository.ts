import { Injectable } from '@angular/core';
import { ILogin, IRegister, loginResponse, registerResponse } from '../../interfaces/auth/auth.interface';
import { Observable } from 'rxjs';
import { PathsEnum } from '../../enums/bases/base.enum';
import { Url } from '../../decorators/urls/url.decorator';
import { BaseRepository } from './base.respository';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository extends BaseRepository {
  @Url(PathsEnum.pathPostSignin)
  private signin!: string;

  @Url(PathsEnum.pathPostSignup)
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
