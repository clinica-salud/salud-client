import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';

import { Role } from '@src/app/shared/enums/role.enum';
import {
	IDocumentType,
	ILogin,
	ILoginReq,
	IProfile,
	IProfileMenu,
	IRegisterReq,
	IRole,
} from '@src/app/shared/models/auth.model';
import { IResponse } from '@src/app/shared/models/response.model';
import { environment } from '@src/environments/environment';

const { api } = environment;

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _http = inject(HttpClient);
	private _router = inject(Router);

	#isLoggedIn = signal(false);
	#user = signal<IProfile | null>(null);
	#roles = signal<IRole[]>([]);
	#role = signal<Role>(Role.NONE);

	public isLoggedIn = computed(() => this.#isLoggedIn());
	public user = computed(() => this.#user());
	public roles = computed(() => this.#roles());
	public role = computed(() => this.#role());

	constructor() {
		this.#isLoggedIn.set(localStorage.getItem('access_token') ? true : false);
	}

	public setUser(user: IProfile) {
		if (!user) {
			this.logout().subscribe();
			return;
		}

		this.#user.set(user);
	}

	public setRoles(roles: IRole[]) {
		if (roles.length === 0) {
			this.logout().subscribe();
			return;
		}

		this.#roles.set(roles);

		if (roles.some((role) => role.rolid === Role.DOCTOR) && roles.length > 0) {
			this.#role.set(Role.DOCTOR);
			return;
		}

		if (roles.some((role) => role.rolid === Role.WORKER) && roles.length > 0) {
			this.#role.set(Role.WORKER);
			return;
		}
	}

	public login(data: ILoginReq) {
		return this._http.post<IResponse<ILogin>>(`${api}/auth/login`, data).pipe(
			tap((response) => {
				if (response && response.status) {
					localStorage.setItem('access_token', response.data.token);
					this.#isLoggedIn.set(true);
				}
			})
		);
	}

	public getDocumentTypes() {
		return this._http
			.get<IResponse<IDocumentType[]>>(`${api}/auth/tipoid`)
			.pipe(map((response) => response.data));
	}

	public register(data: IRegisterReq) {
		return this._http.post<IResponse<[]>>(`${api}/auth/register`, data);
	}

	public getUserData() {
		return this._http
			.get<IResponse<IProfileMenu>>(`${api}/profile`)
			.pipe(map((response) => response.data));
	}

	public logout() {
		return this._http.get<IResponse<[]>>(`${api}/logout`).pipe(
			tap((response) => {
				if (response && response.status) {
					localStorage.removeItem('access_token');
					this.#isLoggedIn.set(false);
					this._router.navigateByUrl('/auth');
				}
			})
		);
	}
}
