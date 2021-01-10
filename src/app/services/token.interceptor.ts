import { Observable, throwError as observableThrowError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


import { catchError, debounce } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  private authService: UsersService;

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(UsersService);
    const token: string = this.authService.getToken();
    const is_necessary_token = this.authService.getNecessaryTokenUrl(request.url);

    if (is_necessary_token && token) {
      request = request.clone({
        setHeaders: {
          'X-Token': `${token}`
        }
      });
    }
    return next.handle(request)
      .pipe(catchError((error: any) => {

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && error.url.indexOf('auth/sign-out') < 0) {
            // logout or session timeout handlding
          } else if (error.status === 423) {
            // handle error
          }
        }
        if (error) {
          console.log(error);
        }
        return observableThrowError(error);
      }));
  }
}
