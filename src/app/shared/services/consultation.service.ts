import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IConsultation } from '@src/app/shared/models/consultation.model';
import { IResponse } from '@src/app/shared/models/response.model';
import { environment } from '@src/environments/environment';
import { map } from 'rxjs';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class ConsultationService {
	private _http = inject(HttpClient);

	public getConsultations() {
		return this._http
			.get<IResponse<IConsultation[]>>(`${api}/salud/consultation`)
			.pipe(map((response) => response.data));
	}

	public getOdontogramConsultations(consultaid: number) {
		return this._http
			.get<IResponse<any[]>>(`${api}/salud/consultation/${consultaid}/odontogram`)
			.pipe(map((response) => response.data));
	}

	public addOdontogramConsultation(consultaid: number, data: any) {
		return this._http
			.post<any>(`${api}/salud/consultation/${consultaid}/odontogram`, data)
			.pipe(map((response) => response.data));
	}

	public patchOdontogramConsultation(consultaid: number, piezaid: number, data: any) {
		return this._http
			.patch<any>(`${api}/salud/consultation/${consultaid}/odontogram/${piezaid}`, data)
			.pipe(map((response) => response.data));
	}

	public deleteOdontogramConsultation(consultaid: number, piezaid: number) {
		return this._http
			.delete<any>(`${api}/salud/consultation/${consultaid}/odontogram/${piezaid}`)
			.pipe(map((response) => response.data));
	}
}
