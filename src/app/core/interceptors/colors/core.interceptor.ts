import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { LocalStorageService } from '../../services/localstorages/localstorage.service';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthVars } from '@interfaces/auth/auth.interface';
import { RoutePathsEnum } from '@enums/bases/base.enum';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const services = inject(LocalStorageService);
  const router = inject(Router);

  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = services.getKey(AuthVars.token);
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          services.clearAll();
          router.navigateByUrl(RoutePathsEnum.routeLogin).then();
          return throwError(() => error);
        default:
          return throwError(() => error);
      }
    })
  );
};
