import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';

import {
	NbButtonModule,
	NbCardModule,
	NbCheckboxModule,
	NbDialogService,
	NbIconModule
} from '@nebular/theme';

import { AddTreatmentModalComponent } from '@src/app/modules/medical-consultations/components/add-treatment-modal/add-treatment-modal.component';
import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';
import { OdontogramGraphComponent } from '@src/app/modules/medical-consultations/components/odontogram-graph/odontogram-graph.component';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { ConsultationService, OdontogramService } from '@src/app/shared/services';
import { map } from 'rxjs';

const NB_MODULES = [NbButtonModule, NbIconModule, NbCardModule, NbCheckboxModule];
const COMPONENTS = [OdontogramGraphComponent, DetailTabComponent];

@Component({
	selector: 'app-odontogram',
	standalone: true,
	imports: [...COMPONENTS, ...NB_MODULES],
	templateUrl: './odontogram.component.html',
	styleUrl: './odontogram.component.scss'
})
export class OdontogramComponent {
	private _dialogService = inject(NbDialogService);
	private _odontogramService = inject(OdontogramService);
	private _consultationService = inject(ConsultationService);
	private _activatedRoute = inject(ActivatedRoute);
	private _destroyRef = inject(DestroyRef);

	private consultaid = toSignal(
		this._activatedRoute.params.pipe(map((params: Params) => params['consultaid']))
	);

	public odontogramConsultations = signal<any[]>([]);

	get teethType() {
		return this._odontogramService.teethType();
	}

	get teeth() {
		return this._odontogramService.teeth();
	}

	constructor() {
		this._odontogramService.getTeethPieces();
		this.getOdontogramConsultation();
	}

	private getOdontogramConsultation() {
		this._consultationService
			.getOdontogramConsultations(this.consultaid())
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((data: any) => this.odontogramConsultations.set(data));
	}

	public toggleTeethType() {
		this._odontogramService.setTeethType(this.teethType === 1 ? 2 : 1);
	}

	public patchTreatment(e: any, item: any) {
		const { piezaid } = item;
		this._consultationService
			.patchOdontogramConsultation(this.consultaid(), piezaid, { es_tratamiento: e })
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.getOdontogramConsultation());
	}

	public deleteOdontogramConsultation(item: any) {
		if (!confirm('¿Esta seguro de eliminar este elemento?')) return;

		this._consultationService
			.deleteOdontogramConsultation(this.consultaid(), item.piezaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.getOdontogramConsultation());
	}

	public addTreatment(tooth?: ITooth) {
		const dialog = this._dialogService.open(AddTreatmentModalComponent, {
			context: {
				selectedTooth: tooth,
				consultaid: this.consultaid()
			}
		});
		dialog.onClose.subscribe(({ cancel }) => {
			if (cancel) return;
			this.getOdontogramConsultation();
		});
	}
}
