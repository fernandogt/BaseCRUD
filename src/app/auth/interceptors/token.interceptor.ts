import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SingletonService } from 'src/app/singleton.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private singletonService: SingletonService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('INTERCEPTA');
    const TOKEN = localStorage.getItem('tk');

    if (TOKEN) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${TOKEN}`
        }
      });
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        localStorage.removeItem('tk');
        this.singletonService.checkUser();
        this.router.navigate(['/login']);
        return throwError(error);
      } else {
        return throwError(error);
      }
    }));

    // return next.handle(request);
  }
}
