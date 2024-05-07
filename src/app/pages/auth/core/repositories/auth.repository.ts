import { Injectable } from '@angular/core';
import { ConstantsRepository } from './constants.repository';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister, Paths, loginResponse, registerResponse } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';

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
  public login(payload: ILogin): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.constansts.get(Paths.signin), payload);
  }

  /**
   * INFO:
   * register - this is responsible to make call http and make register
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public register(payload: IRegister): Observable<registerResponse> {
    return this.http.post<registerResponse>(this.constansts.get(Paths.signup), payload);
  }
}
