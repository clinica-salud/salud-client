import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@src/app/environments/environment';
import { IDocumentType, ILogin, ILoginReq, IRegisterReq } from '@src/app/shared/models/auth.model';
import { IResponse } from '@src/app/shared/models/response.model';
import { map, tap } from 'rxjs';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _http = inject(HttpClient);
	private _router = inject(Router);

	private isLoggedIn$ = signal(false);

	constructor() {
		this.isLoggedIn$.set(localStorage.getItem('access_token') ? true : false);
	}

	get isLoggedIn() {
		return this.isLoggedIn$();
	}

	public login(data: ILoginReq) {
		return this._http.post<IResponse<ILogin>>(`${api}/auth/login`, data).pipe(
			tap((response) => {
				if (response && response.status) {
					localStorage.setItem('access_token', response.data.token);
					this.isLoggedIn$.set(true);
				}
			})
		);
	}

	public getDocumentTypes() {
		return this._http.get<IResponse<IDocumentType[]>>(`${api}/auth/tipoid`).pipe(map((response) => response.data));
	}

	public register(data: IRegisterReq) {
		return this._http.post<IResponse<[]>>(`${api}/auth/register`, data);
	}

	public logout() {
		return this._http.get<IResponse<[]>>(`${api}/logout`).pipe(
			tap((response) => {
				if (response && response.status) {
					localStorage.removeItem('access_token');
					this.isLoggedIn$.set(false);
					this._router.navigateByUrl('/auth');
				}
			})
		);
	}
}
