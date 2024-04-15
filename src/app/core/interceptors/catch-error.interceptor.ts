import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { tap } from 'rxjs';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
	const _toastrService = inject(NbToastrService);

	const interceptResponse = (event: HttpEvent<any>, method: string) => {
		if (event instanceof HttpResponse) {
			if (method !== 'GET' && event.ok) _toastrService.success(event.body.message, 'Éxito');
			if (method !== 'GET' && !event.ok) _toastrService.danger(event.body.message, 'Error');
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
