import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const validateTokenGuard: CanActivateFn = (route, state) => {
	const token = localStorage.getItem('access_token');
	const _router = inject(Router);

	if (!token) {
		_router.navigateByUrl('/auth');
		return false;
	}

	return true;
};
