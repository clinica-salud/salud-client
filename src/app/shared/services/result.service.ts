import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from '@src/app/shared/models';

import { environment } from '@src/environments/environment';

import { map } from 'rxjs';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class ResultService {
	private _http = inject(HttpClient);

	public getResults(params: { [key: string]: string | number }) {
		return this._http
			.get<IResponse<any[]>>(`${api}/salud/result`, { params })
			.pipe(map((response) => response.data));
	}
}
