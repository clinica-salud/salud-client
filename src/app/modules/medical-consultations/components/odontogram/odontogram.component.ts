import { NgStyle } from '@angular/common';
import { Component, DestroyRef, computed, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {
	NbButtonModule,
	NbCardModule,
	NbCheckboxModule,
	NbDialogService,
	NbIconModule,
	NbToggleModule,
	NbTooltipModule,
} from '@nebular/theme';

import { AddTreatmentModalComponent } from '@src/app/modules/medical-consultations/components/add-treatment-modal/add-treatment-modal.component';
import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';
import { OdontogramGraphReadingComponent } from '@src/app/modules/medical-consultations/components/odontogram-graph-reading/odontogram-graph-reading.component';
import { OdontogramGraphComponent } from '@src/app/modules/medical-consultations/components/odontogram-graph/odontogram-graph.component';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { ConsultationService, OdontogramService } from '@src/app/shared/services';

const NB_MODULES = [
	NbButtonModule,
	NbIconModule,
	NbCardModule,
	NbCheckboxModule,
	NbToggleModule,
	NbTooltipModule,
];
const COMPONENTS = [OdontogramGraphComponent, DetailTabComponent, OdontogramGraphReadingComponent];

@Component({
	selector: 'app-odontogram',
	standalone: true,
	imports: [ReactiveFormsModule, NgStyle, ...COMPONENTS, ...NB_MODULES],
	templateUrl: './odontogram.component.html',
	styleUrl: './odontogram.component.scss',
})
export class OdontogramComponent {
	private _dialogService = inject(NbDialogService);
	private _odontogramService = inject(OdontogramService);
	private _consultationService = inject(ConsultationService);
	private _destroyRef = inject(DestroyRef);

	public toggleValue: FormControl = new FormControl(false);

	public consultaid = input.required<number>();
	public odontogramConsultations = input.required<any>();

	public refreshConsultations = output();

	public teethType = computed(() => this._odontogramService.teethType());
	public teeth = computed(() => this._odontogramService.teeth());

	constructor() {
		this._odontogramService.getTeethPieces();
	}

	private onRefreshConsultations() {
		this.refreshConsultations.emit();
	}

	public toggleOdontogram() {
		this.toggleValue.setValue(!this.toggleValue.value);
	}

	public toggleTeethType() {
		this._odontogramService.setTeethType(this.teethType() === 1 ? 2 : 1);
	}

	public patchTreatment(item: any) {
		const { piezaid, es_tratamiento, faseodontogramaid } = item;
		this._consultationService
			.patchOdontogramConsultation(this.consultaid(), piezaid, {
				es_tratamiento: !es_tratamiento,
				faseodontogramaid,
			})
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.onRefreshConsultations());
	}

	public patchTreatmentStatus(item: any) {
		const { piezaid, es_tratamiento, faseodontogramaid } = item;
		this._consultationService
			.patchOdontogramConsultation(this.consultaid(), piezaid, {
				es_tratamiento,
				faseodontogramaid: faseodontogramaid === 2 ? 1 : 2,
			})
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.onRefreshConsultations());
	}

	public deleteOdontogramConsultation(item: any) {
		if (!confirm('¿Esta seguro de eliminar este elemento?')) return;

		this._consultationService
			.deleteOdontogramConsultation(this.consultaid(), item.piezaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.onRefreshConsultations());
	}

	public addTreatment(tooth?: ITooth) {
		const dialog = this._dialogService.open(AddTreatmentModalComponent, {
			context: {
				selectedTooth: tooth,
				consultaid: this.consultaid(),
			},
		});
		dialog.onClose.subscribe(({ cancel }) => {
			if (cancel) return;
			this.onRefreshConsultations();
		});
	}
}
