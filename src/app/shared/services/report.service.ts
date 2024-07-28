import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from '@src/app/shared/models';

import { environment } from '@src/environments/environment';

import { map } from 'rxjs';

const { api } = environment;

@Injectable({
	providedIn: 'root',
})
export class ReportService {
	private _http = inject(HttpClient);

	public getReports(params: any) {
		return this._http
			.get<IResponse<any>>(`${api}/salud/report`, { params })
			.pipe(map((response) => response.data));
	}

	public getReportTreatmentsByYear(anho: number) {
		return this._http
			.get<IResponse<any>>(`${api}/salud/report-treatment/${anho}`)
			.pipe(map((response) => response.data));
	}

	public getDailyActivity(params: any) {
		return this._http
			.get<IResponse<any>>(`${api}/salud/report-daily-activity`, { params })
			.pipe(map((response) => response.data));
	}
}
