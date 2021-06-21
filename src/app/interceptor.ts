import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { from as observableFrom } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './services/user.service';

// When importing a service onto another service,
// you have to inject the other service into the one you want to use
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private UserService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return observableFrom(this.UserService.returnToken()).pipe(
      switchMap((token) => {
        // request object has to be cloned, otherwise you could cause side effects in webapp
        const authRequest = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token), // "Bearer + <token>" is a convention for token naming
        });
        return next.handle(authRequest);
      })
    );
  }
}
