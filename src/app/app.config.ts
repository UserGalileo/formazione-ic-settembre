import {
  ApplicationConfig, ErrorHandler,
  InjectionToken,
  provideZoneChangeDetection
} from '@angular/core';
import {LoggerService} from "./services/logger.service";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {routes} from "./app.routes";
import {noopInterceptor} from "./interceptors/noop.interceptor";
import {cacheInterceptor} from "./interceptors/cache.interceptor";
import {retryInterceptor} from "./interceptors/retry.interceptor";
import {MyErrorHandler} from "./services/error.handler";

const config = {
  apiUrl: '/api/v3/'
}

export const APP_CONFIG = new InjectionToken(
  'Description for APP_CONFIG',
  {
    providedIn: 'root',
    factory: () => config
  }
);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: MyErrorHandler },
    provideHttpClient(
      withInterceptors([noopInterceptor, cacheInterceptor, retryInterceptor])
    ),
    provideRouter(routes, withComponentInputBinding()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    LoggerService,
  ]
};
