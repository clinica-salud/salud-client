import { Component, inject } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Router } from '@angular/router'
import { map } from 'rxjs'

import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
	NbActionsModule,
	NbContextMenuModule,
	NbIconModule,
	NbMediaBreakpointsService,
	NbSidebarService,
	NbThemeService,
	NbUserModule
} from '@nebular/theme'

import { MenuService, User, UserMenu } from '@src/app/core/services'

const NB_MODULES = [NbIconModule, NbActionsModule, NbUserModule, NbContextMenuModule, NbEvaIconsModule]

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	private _breakpointService = inject(NbMediaBreakpointsService)
	private _menuService = inject(MenuService)
	private _sidebarService = inject(NbSidebarService)
	private _themeService = inject(NbThemeService)
	private _router = inject(Router)

	public userPictureOnly: boolean = false
	public user: User = { name: '', picture: '' }
	public userMenu: UserMenu[] = []

	constructor() {
		const { xl } = this._breakpointService.getBreakpointsMap()

		this._themeService
			.onMediaQueryChange()
			.pipe(
				map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
				takeUntilDestroyed()
			)
			.subscribe((isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl))

		this.user = this._menuService.user
		this.userMenu = this._menuService.userMenu
	}

	public toggleSidebar(): boolean {
		this._sidebarService.toggle(true, 'menu-sidebar')
		return false
	}

	public navigateHome(): void {
		this._router.navigateByUrl('/')
	}
}
