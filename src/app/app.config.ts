import {ApplicationConfig, InjectionToken, provideZoneChangeDetection} from '@angular/core';
import {LoggerService} from "./services/logger.service";
import {provideHttpClient} from "@angular/common/http";

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
    provideZoneChangeDetection({ eventCoalescing: true }),
    LoggerService,
  ]
};
