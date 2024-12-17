import { Injectable } from '@angular/core';
import {
  ILogin,
  IRegister,
  IResetPassRequest,
  LoginResponse,
  LegisterResponse,
  ResetPassResponse,
  ICreatePassRequest,
  CreatePassResponse,
} from '@interfaces/auth/auth.interface';
import { Observable } from 'rxjs';
import { PathsEnum } from '@enums/bases/base.enum';
import { Url } from '@decorators/urls/url.decorator';
import { BaseRepository } from './base.respository';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository extends BaseRepository {
  @Url(PathsEnum.pathPostSignin)
  private pathSignin!: string;

  @Url(PathsEnum.pathPostSignup)
  private pathSignup!: string;

  @Url(PathsEnum.pathResePassword)
  private pathResetPass!: string;

  @Url(PathsEnum.pathCreatePassword)
  private pathCreatePass!: string;

  /**
   * login - this is responsible to make call http and make login
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public login(payload: ILogin): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.pathSignin, payload);
  }

  /**
   * register - this is responsible to make call http and make register
   *
   * @param payload ILogin
   * @returns Observable<HttpResponseDefault<string>>
   */
  public register(payload: IRegister): Observable<LegisterResponse> {
    return this.http.post<LegisterResponse>(this.pathSignup, payload);
  }

  /**
   *
   * @param request IResetPassRequest
   * @returns Observable<ResetPassResponse>
   */
  public resetPassword(request: IResetPassRequest): Observable<ResetPassResponse> {
    return this.http.post<ResetPassResponse>(this.pathResetPass, request);
  }

  /**
   *
   * @param token string
   * @param request ICreatePassRequest
   * @returns Observable<ResetPassResponse>
   */
  public createPassword(request: ICreatePassRequest): Observable<CreatePassResponse> {
    return this.http.post<ResetPassResponse>(this.pathCreatePass.replace('{token}', request.token), {
      password: request.password,
    });
  }
}
