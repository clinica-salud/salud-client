import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params } from '@angular/router';

import { NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';

import { DiagnosisTreatmentComponent } from '@src/app/modules/medical-consultations/components/diagnosis-treatment/diagnosis-treatment.component';
import { HistoryComponent } from '@src/app/modules/medical-consultations/components/history/history.component';
import { NotesComponent } from '@src/app/modules/medical-consultations/components/notes/notes.component';
import { OdontogramComponent } from '@src/app/modules/medical-consultations/components/odontogram/odontogram.component';
import { ConsultationService } from '@src/app/shared/services';
import { map } from 'rxjs';

const NB_MODULES = [NbCardModule, NbTabsetModule, NbIconModule];
const COMPONENTS = [
	OdontogramComponent,
	HistoryComponent,
	DiagnosisTreatmentComponent,
	NotesComponent
];

@Component({
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export class DetailComponent {
	private _consultationService = inject(ConsultationService);
	private _activatedRoute = inject(ActivatedRoute);
	private _destroyRef = inject(DestroyRef);

	public consultaid = toSignal(
		this._activatedRoute.params.pipe(map((params: Params) => params['consultaid']))
	);

	public odontogramConsultations = signal<any[]>([]);
	public treatments = signal<any[]>([]);
	public consulta = signal<any>({});

	constructor() {
		this.getOdontogramConsultation();
	}

	private getOdontogramConsultation() {
		this._consultationService
			.getOdontogramConsultations(this.consultaid())
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(({ piezas, consulta }: any) => {
				this.odontogramConsultations.set(piezas);
				this.treatments.set(piezas.filter((x: any) => x.es_tratamiento));
				this.consulta.set(consulta);
			});
	}

	public onRefreshConsultations() {
		this.getOdontogramConsultation();
	}
}
