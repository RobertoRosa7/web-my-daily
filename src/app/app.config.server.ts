import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * @see: https://medium.com/@iyieldinov/angular-17-ssr-leveraging-transferstate-for-server-side-environment-variables-or-other-external-2fcb6adbdd06
 * @see: https://medium.com/web-development-with-sumit/how-to-handle-browser-storage-in-angular-ssr-19df7590a8b3
 */
const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
