import { inject } from "@angular/core";
import {
    HttpRequest,
    HttpHeaders,
    HttpInterceptorFn,
    HttpHandlerFn,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";

import { NgxSpinnerService } from "ngx-spinner";

import { HTTPStatus } from "../http-status.service";
import { AuthService } from "../auth/auth.service";

export const loaderInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const spinner = inject(NgxSpinnerService);
  const status = inject(HTTPStatus);
  const authService = inject(AuthService);
  const router = inject(Router);

  let headers= new HttpHeaders();
  const token = authService.getToken();
  const cleantoken = token?.replace(/"/g, '');
  console.log('Token usado na requisição:', cleantoken);

  if (req.url.includes('api.ipify.org')) {
    headers = headers
      .set('contentType', 'false')
      .set('processData', 'false');
  } else if (req.body instanceof FormData) {
    headers = headers
      .set('contentType', 'false')
      .set('processData', 'false')
      .set('Authorization', `Bearer ${cleantoken}`);
  } else {
    headers = headers
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${cleantoken}`);
  }

  const request = req.clone({ headers });
  status.setHttpStatus(true);
  spinner.show();

  return next(request).pipe(
    map(event => event),
    catchError(error => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login'], {
          queryParams: { redirect: router.routerState.snapshot.url }
        });
      }
      return throwError(() => error);
    }),
    finalize(() => {
      status.setHttpStatus(false);
      spinner.hide();
    })
  );
};
