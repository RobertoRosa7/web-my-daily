import { Injectable } from '@angular/core';
import { ConstantsRepository, Paths } from './constants.repository';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister } from '../interface/auth.interface';
import { Observable, of } from 'rxjs';
import { HttpResponseDefault } from '../../../../interface/http-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly responseTemp: HttpResponseDefault<string> = {
    data: 'token',
    error: false,
    message: 'ok',
  };

  constructor(private readonly constansts: ConstantsRepository, private readonly http: HttpClient) {}

  /**
   * INFO:
   * login - this is responsible to make call http and make login
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public login(payload: ILogin): Observable<HttpResponseDefault<string>> {
    // uncomment to integrate backen
    // return this.http.post<HttpResponseDefault<string>>(this.constansts.get(Paths.signin), payload);

    return of(this.responseTemp);
  }

  /**
   * INFO:
   * register - this is responsible to make call http and make register
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public register(payload: IRegister): Observable<HttpResponseDefault<string>> {
    // uncomment to integrate backen
    // return this.http.post<HttpResponseDefault<string>>(this.constansts.get(Paths.signup), payload);

    return of(this.responseTemp);
  }
}
