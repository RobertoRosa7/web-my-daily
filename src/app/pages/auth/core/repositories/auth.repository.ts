import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, IRegister, loginResponse, registerResponse } from '../interfaces/auth.interface';
import { Observable } from 'rxjs';
import { Paths } from '../../../../core/enums/bases/base.enum';
import { Url } from '../../../../core/decorators/urls/url.decorator';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  @Url(Paths.signin)
  private signin!: string;

  @Url(Paths.signup)
  private signup!: string;

  constructor(private readonly http: HttpClient) {}

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
