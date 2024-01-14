import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService, // Replace with your authentication service
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      request = this.addAccessTokenToRequest(request, accessToken);
    } else {
      request = this.addAccessTokenToRequest(request, null);
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (!request.url.includes('login') && !request.url.includes('logout') && error instanceof HttpErrorResponse && error.status === 403) {
          // Token expired or unauthorized
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);

            // Call your refresh token method and obtain a new access token
            return this.authService.getNewAccessToken({token: this.authService.getRefreshToken()}).pipe(
              switchMap((newAccessToken: any) => {
                console.log('newAccessToken response', newAccessToken);
                this.refreshTokenInProgress = false;
                this.refreshTokenSubject.next(newAccessToken);
                request = this.addAccessTokenToRequest(request, newAccessToken.accessToken);
                this.authService.setUserData(newAccessToken);
                return next.handle(request);
              }),
              catchError((refreshError: any) => {
                this.authService.logoutUser({token: this.authService.getRefreshToken()}); // Log the user out if refresh token fails
                return throwError(()=> new Error(refreshError));
              })
            );
          } else {
            // Wait for the new token and then retry the request
            return this.refreshTokenSubject.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((newAccessToken) => {
                request = this.addAccessTokenToRequest(request, newAccessToken);
                return next.handle(request);
              })
            );
          }
        } else {
          console.log("rererere", request, error);
          return throwError(()=> new Error(error));
        }
      })
    );
  }

  private addAccessTokenToRequest(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}