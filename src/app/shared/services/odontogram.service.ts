import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { map } from 'rxjs';

import { TeethType } from '@src/app/shared/enums';
import { IFace, IResponse, ITooth, IToothMinimal, ITreatment } from '@src/app/shared/models';
import { environment } from '@src/environments/environment';

const { api } = environment;

@Injectable({
	providedIn: 'root'
})
export class OdontogramService {
	private _http = inject(HttpClient);

	#teethType = signal(TeethType.ADULT);
	#teeth = signal<ITooth[]>([]);

	public teethType = computed(() => this.#teethType());
	public teeth = computed(() => this.#teeth());

	public setTeethType(value: TeethType) {
		this.#teethType.set(value);
		this.#teeth.set([]);
		this.getTeethPieces(value);
	}

	public getTeethPieces(teethType: TeethType = this.teethType()) {
		return this._http
			.get<IResponse<ITooth[]>>(`${api}/salud/teeth/${teethType}`)
			.pipe(map((response) => response.data))
			.subscribe((data) => this.#teeth.set(data));
	}

	public getMinimalTeethPieces(teethType: TeethType = this.teethType()) {
		return this._http
			.get<IResponse<IToothMinimal[]>>(`${api}/salud/numero-pieza/${teethType}`)
			.pipe(map((response) => response.data));
	}

	public getTreatments() {
		return this._http
			.get<IResponse<ITreatment[]>>(`${api}/salud/type-treatment`)
			.pipe(map((response) => response.data));
	}

	public getFaces() {
		return this._http
			.get<IResponse<IFace[]>>(`${api}/salud/face-type`)
			.pipe(map((response) => response.data));
	}
}
