import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppInterceptor } from './app.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptorsFromDi()
        ),
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes), 
        provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
    ]
};
