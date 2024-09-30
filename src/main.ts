/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import './app/rxjs-test';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

