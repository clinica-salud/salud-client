import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IRecipe, IResponse } from '@src/app/shared/models';

import { environment } from '@src/environments/environment';

import { map } from 'rxjs';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class RecipeService {
	private _http = inject(HttpClient);

	public getRecipes(citaid: number) {
		return this._http
			.get<IResponse<IRecipe[]>>(`${api}/salud/recipe`, { params: { citaid } })
			.pipe(map((response) => response.data));
	}

	public addRecipe(data: any) {
		return this._http.post<any>(`${api}/salud/recipe`, data).pipe(map((response) => response.data));
	}

	public deleteRecipe(recetaid: number) {
		return this._http
			.delete<any>(`${api}/salud/recipe/${recetaid}`)
			.pipe(map((response) => response.data));
	}
}
