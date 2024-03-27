import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { finalize } from 'rxjs'

import { SpinnerService } from '@src/app/core/services/spinner.service'

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
	const _spinnerService = inject(SpinnerService)
	let countRequest = 0

	if (!countRequest) {
		_spinnerService.onSpinner()
	}

	countRequest++

	return next(req).pipe(
		finalize(() => {
			countRequest--
			if (!countRequest) {
				_spinnerService.ofSpinner()
			}
		})
	)
}
