import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import {
	ICost,
	IDoctor,
	IPersona,
	IResponse,
	ITypesService,
	ITypesSpeciality,
	ITypesTreatment,
} from '@src/app/shared/models';
import { environment } from '@src/environments/environment';

const { api } = environment;

@Injectable({
	providedIn: 'root',
})
export class SetupService {
	private _http = inject(HttpClient);

	public getBuildings() {
		return this._http
			.get<IResponse<any[]>>(`${api}/salud/building`)
			.pipe(map((response) => response.data));
	}

	public getDoctors() {
		return this._http
			.get<IResponse<IDoctor[]>>(`${api}/salud/doctor`)
			.pipe(map((response) => response.data));
	}

	public getDoctorsBySpeciality(especialidadid: number) {
		return this._http
			.get<IResponse<IDoctor[]>>(`${api}/salud/doctor/${especialidadid}`)
			.pipe(map((response) => response.data));
	}

	public getTypesServices() {
		return this._http
			.get<IResponse<ITypesService[]>>(`${api}/salud/types-service`)
			.pipe(map((response) => response.data));
	}

	public getTypesSpecialities() {
		return this._http
			.get<IResponse<ITypesSpeciality[]>>(`${api}/salud/types-speciality`)
			.pipe(map((response) => response.data));
	}

	public getTypesTreatments() {
		return this._http
			.get<IResponse<ITypesTreatment[]>>(`${api}/salud/types-treatment`)
			.pipe(map((response) => response.data));
	}

	public getPersonByDNI(dni: string) {
		return this._http
			.get<IResponse<IPersona>>(`${api}/basic/persona-dni`, { params: { dni } })
			.pipe(map((response) => response.data));
	}

	public getCost(params: { [key: string]: number }) {
		return this._http
			.get<IResponse<ICost>>(`${api}/salud/cost`, { params })
			.pipe(map((response) => response.data));
	}
}
