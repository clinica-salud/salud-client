import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

import { NbToastrService } from '@nebular/theme';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const _toastrService = inject(NbToastrService);

	const interceptResponse = (event: HttpEvent<any>, method: string) => {
		if (event instanceof HttpResponse && method !== 'GET') {
			const { body } = event;
			if (body.status) {
				_toastrService.success(body.message, 'Éxito');
			} else {
				_toastrService.danger(body.message, 'Error');
			}
		}
	};

	const catchError = (err: any) => {
		if (!err.ok) _toastrService.danger(err.error.message, err.statusText);
	};

	return next(req).pipe(
		tap({
			next: (res) => interceptResponse(res, req.method),
			error: (err) => catchError(err)
		})
	);
};
