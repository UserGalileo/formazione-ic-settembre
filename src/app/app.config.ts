import {
  ApplicationConfig,
  InjectionToken,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection
} from '@angular/core';
import {LoggerService} from "./services/logger.service";
import {provideHttpClient} from "@angular/common/http";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {routes} from "./app.routes";

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
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    LoggerService,
  ]
};
