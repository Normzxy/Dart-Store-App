import { ApplicationConfig, inject, provideZoneChangeDetection, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { InitService } from './core/services/init.service'
import { lastValueFrom } from 'rxjs';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import {errorInterceptor} from './core/interceptors/error.interceptor';

// Everything here is as default except provideHttpClient.
export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      // This is defined in app.routes.ts
      provideRouter(routes),
      provideAnimationsAsync(),
      // Interceptors catch every Https request being sent.
      provideHttpClient(withInterceptors(
          [
              authInterceptor,
              errorInterceptor
          ]
      )),
      provideAppInitializer(initializeApp)
  ],
};

async function initializeApp(initService = inject(InitService)) {
    // Observable from init method from init.service needs to be returned.
    try {
        return await lastValueFrom(initService.init());
    } finally {
        // Creating HTML that will be displayed during initialization.
        const splash = document.getElementById('initial-splash');
        if (splash) {
            splash.remove();
        }
    }
}
