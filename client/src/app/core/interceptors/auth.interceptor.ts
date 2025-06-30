import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Interceptor catches every HTTP request being sent.

    // Requests are immutable, clone is required.
    const clonedRequest = req.clone({
        withCredentials: true
    });
    // Modified observable is being returned.
    return next(clonedRequest);
};
