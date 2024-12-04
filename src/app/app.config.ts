import { ApplicationConfig, LOCALE_ID, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { authInterceptor } from './core/interceptors/colors/core.interceptor';
import { colorReducer } from './core/reducers/colors/color.reducer';
import { userReducer } from './core/reducers/user/user.reducer';
import { rdMessages } from '@reducers/message/message.reducer';
import { provideServiceWorker } from '@angular/service-worker';

registerLocaleData(localePt, 'pt');

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideState({ name: 'colors', reducer: colorReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideState({ name: 'message', reducer: rdMessages }),
    provideStore(),
    // provideClientHydration(withNoHttpTransferCache()),
    // withHttpTransferCacheOptions({
    //   includePostRequests: true,
    // })
    provideStoreDevtools({
        maxAge: 45,
        logOnly: false, // Restrict extension to log-only mode
    }),
    {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE],
    },
    { provide: LOCALE_ID, useValue: 'pt' },
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
};
