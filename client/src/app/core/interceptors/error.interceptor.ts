import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {NavigationExtras, Router} from '@angular/router';
import {inject} from '@angular/core';
import {SnackbarService} from '../services/snackbar.service';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router)
    const snackbar = inject(SnackbarService)

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 400) {
                if (error.error.errors) {
                    const modelStateErrors = []
                    for (const key in error.error.errors) {
                        if (error.error.errors[key]) {
                            modelStateErrors.push(error.error.errors[key])
                        }
                    }
                    // Flattens one level of nesting.
                    throw modelStateErrors.flat()
                } else {
                    snackbar.error(error.error.title || error.error)
                }
            }
            if (error.status === 401) {
                snackbar.error(error.error.title || error.error)
            }
            if (error.status === 404) {
                router.navigateByUrl('/not-found')
                    .then(() => "Page not found.")
            }
            if (error.status === 500) {
                const navigationExtras: NavigationExtras = {state: error.error}
                router.navigateByUrl('/server-error', navigationExtras)
                    .then(() => "Server side error occured.")
            }
            return throwError(() => error)
        })
    )
};
