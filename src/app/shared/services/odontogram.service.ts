import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TeethType } from '@src/app/shared/enums/odontogram.enum';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { IResponse } from '@src/app/shared/models/response.model';
import { environment } from '@src/environments/environment';
import { map } from 'rxjs';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class OdontogramService {
	private _http = inject(HttpClient);

	public getTeethPieces(teethType: TeethType = TeethType.ADULT) {
		return this._http
			.get<IResponse<ITooth[]>>(`${api}/salud/teeth/${teethType}`)
			.pipe(map((response) => response.data));
	}
}
