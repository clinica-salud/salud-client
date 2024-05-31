import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

import { inject } from '@angular/core';
import { SpinnerService } from '@src/app/core/services/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
	const _spinnerService = inject(SpinnerService);
	_spinnerService.onSpinner();

	return next(req).pipe(finalize(() => _spinnerService.ofSpinner()));
};
