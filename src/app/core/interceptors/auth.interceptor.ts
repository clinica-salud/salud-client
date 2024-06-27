import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const _router = inject(Router);

	const token = localStorage.getItem('access_token');

	if (token) {
		req = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	return next(req).pipe(
		catchError((err) => {
			// const access_token = localStorage.getItem('access_token');

			// if (err && access_token) {
			// 	localStorage.removeItem('access_token');
			// }

			if (err.status === 401) {
				localStorage.removeItem('access_token');
				_router.navigateByUrl('/auth');
			}

			return throwError(() => err);
		})
	);
};
