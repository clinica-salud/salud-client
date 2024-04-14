import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@src/app/environments/environment';
import { IResponse } from '@src/app/shared/models/response.model';
import { tap } from 'rxjs';

const { api } = environment;

export type LoginData = {
	email: string;
	password: string;
};

export type RegisterData = {
	name: string;
	ape_pat: string;
	ape_mat: string;
	tipoid: number;
	numero: string;
	email: string;
	password: string;
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _http = inject(HttpClient);
	private _router = inject(Router);

	public login(data: LoginData) {
		return this._http.post(`${api}/auth/login`, data).pipe(
			tap((res: any) => {
				if (res && res.status) localStorage.setItem('access_token', res.data.token);
			})
		);
	}

	public getDocumentTypes() {
		return this._http.get<IResponse<any>>(`${api}/auth/tipoid`);
	}

	public register(data: RegisterData) {
		return this._http.post(`${api}/auth/register`, data).pipe(
			tap((res: any) => {
				if (res && res.status) localStorage.setItem('access_token', res.data.token);
			})
		);
	}

	public logout() {
		return this._http.get(`${api}/logout`).pipe(
			tap((res: any) => {
				if (res && res.status) {
					localStorage.removeItem('access_token');
					this._router.navigateByUrl('/auth');
				}
			})
		);
	}

	// public validateToken() {
	// 	return this._http.get(`${api}/validate-token`).pipe(
	// 		tap((res: any) => {
	// 			if (res && res.status) {
	// 				localStorage.setItem('access_token', res.data.token);
	// 			}
	// 		})
	// 	)
	// }
}
