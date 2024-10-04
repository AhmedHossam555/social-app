import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptor-header/header.interceptor';
import { loadingInterceptor } from './core/interceptor-loading/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor, loadingInterceptor]))
  ]
};
