import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
	NbActionsModule,
	NbButtonModule,
	NbContextMenuModule,
	NbIconModule,
	NbMediaBreakpointsService,
	NbMenuItem,
	NbMenuService,
	NbSidebarService,
	NbThemeService,
	NbUserModule,
} from '@nebular/theme';

import { AuthService, MenuService } from '@src/app/core/services';

const NB_MODULES = [
	NbActionsModule,
	NbButtonModule,
	NbContextMenuModule,
	NbEvaIconsModule,
	NbIconModule,
	NbUserModule,
];

const PROFILE_PICTURE =
	'https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	private _authService = inject(AuthService);
	private _breakpointService = inject(NbMediaBreakpointsService);
	private _menuService = inject(MenuService);
	private _nbMenuService = inject(NbMenuService);
	private _router = inject(Router);
	private _sidebarService = inject(NbSidebarService);
	private _themeService = inject(NbThemeService);

	public hideMenuOnClick = signal(false);
	public userPictureOnly = signal(false);

	public profilePicture = signal<string>(PROFILE_PICTURE);
	public userName = computed(() => this._authService.user()?.name ?? '');
	public userMenu = signal<NbMenuItem[]>([]);

	constructor() {
		const { xl, is } = this._breakpointService.getBreakpointsMap();

		this._themeService
			.onMediaQueryChange()
			.pipe(
				map(([, currentBreakpoint]) => currentBreakpoint),
				takeUntilDestroyed()
			)
			.subscribe((currentBreakpoint) => {
				this.userPictureOnly.set(currentBreakpoint.width < xl);
				this.hideMenuOnClick.set(currentBreakpoint.width <= is);
			});

		// this.user.set({
		// 		name: this._authService.user()?.name,
		// 	});
		this.userMenu.set(this._menuService.userMenu());

		this._nbMenuService.onItemClick().subscribe(({ item }) => {
			if (this.hideMenuOnClick()) this._sidebarService.collapse('menu-sidebar');
			if (item.data?.action === 'logout') {
				this._authService.logout().subscribe();
			}
		});
	}

	public toggleSidebar() {
		this._sidebarService.toggle(true, 'menu-sidebar');
		return false;
	}

	public newAppointment() {
		this._router.navigateByUrl('/pages/appointments/new');
	}

	public navigateHome() {
		this._router.navigateByUrl('/');
	}
}
