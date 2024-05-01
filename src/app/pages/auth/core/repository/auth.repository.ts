import { Injectable } from '@angular/core';
import { ConstantsRepository, Paths } from './constants.repository';
import { HttpClient } from '@angular/common/http';
import { IAuthState, ILogin, IRegister } from '../interface/auth.interface';
import { Observable } from 'rxjs';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  constructor(private readonly constansts: ConstantsRepository, private readonly http: HttpClient) {}

  /**
   * INFO:
   * login - this is responsible to make call http and make login
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public login(payload: ILogin): Observable<HttpResponseDefault<IAuthState>> {
    return this.http.post<HttpResponseDefault<IAuthState>>(this.constansts.get(Paths.signin), payload);
  }

  /**
   * INFO:
   * register - this is responsible to make call http and make register
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public register(payload: IRegister): Observable<HttpResponseDefault<IAuthState>> {
    return this.http.post<HttpResponseDefault<IAuthState>>(this.constansts.get(Paths.signup), payload);
  }
}
