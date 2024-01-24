import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './base-url.interceptor';

/** Array of Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
];
