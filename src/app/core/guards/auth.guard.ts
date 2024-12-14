import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.services';
import { isPlatformBrowser } from '@angular/common';
import { RoutePathsEnum } from '@enums/bases/base.enum';

export const authGuard: CanActivateFn = (route, state) => {
  // Serviços injetados de forma direta usando `inject`

  const router = inject(Router);
  const authService = inject(AuthService);
  const snackbar = inject(MatSnackBar);
  const platformId = inject(PLATFORM_ID);

  // Verifica se está rodando no navegador
  if (!isPlatformBrowser(platformId)) {
    return of(false); // Bloqueia autenticação fora do navegador
  }

  // Implementação da lógica de autenticação
  return authService.isSessionUserObservable().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        // Navega para a página inicial caso não esteja autenticado
        router.navigateByUrl(RoutePathsEnum.routeLogin).then();

        // Exibe uma mensagem amigável
        snackbar.open('Sua credencial expirou!', 'ok');

        return false;
      }
      return true;
    }),
    catchError((error) => {
      console.error('Erro na verificação de autenticação:', error);
      return of(false);
    })
  );
};
