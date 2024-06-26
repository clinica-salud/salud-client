import { Injectable, computed, signal } from '@angular/core';

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
	#user = signal<User>({
		name: 'Miguel',
		picture:
			'https://static.vecteezy.com/system/resources/previews/005/129/844/original/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'
	});

	#userMenu = signal<NbMenuItem[]>([
		// { title: 'Profile', icon: 'person-outline', data: { action: 'profile' } },
		{
			title: 'Cerrar sesión',
			icon: 'power-outline',
			data: { action: 'logout' }
		}
	]);

	#menu = signal<Menu[]>([
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
			title: 'Historias clínicas',
			icon: 'trending-up-outline',
			link: '/pages/results'
		}
	]);

	public menu = computed(() => this.#menu());
	public user = computed(() => this.#user());
	public userMenu = computed(() => this.#userMenu());
}
