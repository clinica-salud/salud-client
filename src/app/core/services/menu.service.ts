import { Injectable } from '@angular/core';

import { NbMenuItem } from '@nebular/theme';

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
	providedIn: 'root'
})
export class MenuService {
	#user: User = {
		name: 'Miguel',
		picture:
			'https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
	};

	#userMenu: NbMenuItem[] = [
		// { title: 'Profile', icon: 'person-outline', data: { action: 'profile' } },
		{ title: 'Cerrar sesión', icon: 'power-outline', data: { action: 'logout' } }
	];

	#menu: Menu[] = [
		{
			title: 'Dashboard',
			icon: 'grid-outline',
			link: '/pages/dashboard'
		},
		{
			title: 'Mis citas',
			icon: 'calendar-outline',
			link: '/pages/appointments'
		},
		{
			title: 'Consultas médicas',
			icon: 'book-outline',
			link: '/pages/medical-consultations'
		},
		{
			title: 'Resultados',
			icon: 'trending-up-outline',
			link: '/pages/results'
		}
	];

	get menu() {
		return this.#menu;
	}

	get user() {
		return this.#user;
	}

	get userMenu() {
		return this.#userMenu;
	}
}
