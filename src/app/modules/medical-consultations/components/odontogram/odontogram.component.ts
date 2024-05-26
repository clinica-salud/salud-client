import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { finalize } from 'rxjs';

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

	private consultaid = signal<number>(0);

	public odontogramConsultations = signal<any[]>([]);

	get teethType() {
		return this._odontogramService.teethType;
	}

	get teeth() {
		return this._odontogramService.teeth;
	}

	constructor() {
		this._activatedRoute.params.subscribe((params: Params) =>
			this.consultaid.set(params['consultaid'])
		);

		this._odontogramService.getTeethPieces();
		this.getOdontogramConsultation();
	}

	private getOdontogramConsultation() {
		this._consultationService
			.getOdontogramConsultation(this.consultaid())
			.pipe(finalize(takeUntilDestroyed))
			.subscribe((data: any) => this.odontogramConsultations.set(data));
	}

	public toggleTeethType() {
		this._odontogramService.teethType = this.teethType === 1 ? 2 : 1;
	}

	public patchTreatment(e: any, item: any) {
		const { piezaid } = item;
		this._consultationService
			.patchOdontogramConsultation(this.consultaid(), piezaid, { es_tratamiento: e })
			.subscribe(() => this.getOdontogramConsultation());
	}

	public deleteOdontogramConsultation(item: any) {
		if (!confirm('¿Esta seguro de eliminar este elemento?')) return;

		this._consultationService
			.deleteOdontogramConsultation(this.consultaid(), item.piezaid)
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
