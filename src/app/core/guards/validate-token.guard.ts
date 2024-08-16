import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, MenuService } from '@src/app/core/services';

export const validateTokenGuard: CanActivateFn = (route, state) => {
	const token = localStorage.getItem('access_token');
	const _router = inject(Router);
	const _authService = inject(AuthService);
	const _menuService = inject(MenuService);

	if (!token) {
		_router.navigateByUrl('/auth');
		return false;
	} else {
		_authService.getUserData().subscribe((profileMenu) => {
			_authService.setUser(profileMenu.user);
			_authService.setRoles(profileMenu.roles);
			_menuService.setMenu(profileMenu.accessMenu);
		});
	}

	return true;
};
