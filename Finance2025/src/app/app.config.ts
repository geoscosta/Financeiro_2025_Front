import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthGuard } from './common/guards/auth-guard.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderInterceptor } from './common/services/interceptor/loader-interceptor';
import { HTTPStatus } from './common/services/http-status.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    AuthGuard,
    HTTPStatus,
    importProvidersFrom(NgxSpinnerModule)
  ]
};
