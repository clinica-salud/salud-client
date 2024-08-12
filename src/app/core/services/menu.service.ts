import { Injectable, computed, inject, signal } from '@angular/core';

import { NbMenuItem } from '@nebular/theme';
import { AuthService } from '@src/app/core/services/auth.service';
import { IAccessMenu } from '@src/app/shared/models';

export interface User {
	name: string;
	picture: string;
}

export interface Menu {
	title: string;
	icon: string;
	link?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root',
})
export class MenuService {
	private _authService = inject(AuthService);

	#userMenu = signal<NbMenuItem[]>([
		{
			title: 'Cerrar sesión',
			icon: 'power-outline',
			data: { action: 'logout' },
		},
	]);

	#menu = signal<Menu[]>([
		// {
		// 	title: 'Dashboard',
		// 	icon: 'grid-outline',
		// 	link: '/pages/dashboard',
		// },
		// {
		// 	title: 'Mis citas',
		// 	icon: 'calendar-outline',
		// 	link: '/pages/appointments',
		// },
		// {
		// 	title: 'Consultas médicas',
		// 	icon: 'book-outline',
		// 	link: '/pages/medical-consultations',
		// },
		// {
		// 	title: 'Historias clínicas',
		// 	icon: 'trending-up-outline',
		// 	link: '/pages/results',
		// },
	]);

	public menu = computed(() => this.#menu());
	public userMenu = computed(() => this.#userMenu());

	public setMenu(menu: IAccessMenu[]) {
		if (menu.length === 0) this._authService.logout().subscribe();

		const formattedMenu = menu
			.filter((item) => item.padreid !== 0)
			.map((item) => {
				return {
					title: item.titulo,
					icon: item.imagen,
					link: item.link,
				};
			});

		this.#menu.set([
			{
				title: 'Dashboard',
				icon: 'grid-outline',
				link: '/pages/dashboard',
			},
			...formattedMenu,
		]);
	}
}
