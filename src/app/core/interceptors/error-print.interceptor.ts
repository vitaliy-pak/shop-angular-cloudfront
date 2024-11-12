import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error) => {
          const url = new URL(request.url);
          let message = `Request to "${url.pathname}" failed. Check the console for the details`;

          if (error.status === 401 || error.status === 403) {
            message = error.error?.message;
          }

          this.notificationService.showError(message, 0);
        },
      }),
    );
  }
}
