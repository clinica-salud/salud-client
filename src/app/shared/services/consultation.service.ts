import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { IConsultation, IResponse } from '@src/app/shared/models';
import { environment } from '@src/environments/environment';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class ConsultationService {
	private _http = inject(HttpClient);

	public getConsultations(params: { [key: string]: string | number }) {
		return this._http
			.get<IResponse<IConsultation[]>>(`${api}/salud/consultation`, { params })
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

	public generatePDF(consultaid: number) {
		const headers = { Accept: 'application/pdf', 'Content-Type': 'application/json' };

		return this._http.get(`${api}/salud/consultation/${consultaid}/odontogram-pdf`, {
			headers,
			responseType: 'blob'
		});
	}
}
