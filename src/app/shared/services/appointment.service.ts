import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { IAppointment, IResponse, IStatus } from '@src/app/shared/models';
import { environment } from '@src/environments/environment';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class AppointmentService {
	private _http = inject(HttpClient);

	public getStatuses() {
		return this._http
			.get<IResponse<IStatus[]>>(`${api}/salud/appointment/status`)
			.pipe(map((response) => response.data));
	}

	public getAppointments(params: { [key: string]: string | number }) {
		return this._http
			.get<IResponse<IAppointment[]>>(`${api}/salud/appointment`, { params })
			.pipe(map((response) => response.data));
	}

	public getAppointmentById(id: number) {
		return this._http
			.get<IResponse<any>>(`${api}/salud/appointment/${id}`)
			.pipe(map((response) => response.data));
	}

	public addAppointment(data: { [key: string]: string | number }) {
		return this._http
			.post<any>(`${api}/salud/appointment`, data)
			.pipe(map((response) => response.data));
	}
}
