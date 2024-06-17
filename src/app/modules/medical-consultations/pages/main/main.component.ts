import { UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbDialogService,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbSelectModule,
	NbUserModule
} from '@nebular/theme';

import { SummaryModalComponent } from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';
import { IConsultation } from '@src/app/shared/models/consultation.model';
import { ConsultationService } from '@src/app/shared/services';

const NB_MODULES = [
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbSelectModule,
	NbUserModule
];

@Component({
	standalone: true,
	imports: [UpperCasePipe, ...NB_MODULES],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {
	private _dialogService = inject(NbDialogService);
	private _consultationService = inject(ConsultationService);
	private _destroyRef = inject(DestroyRef);

	public tableHeadings = signal([
		'Fecha',
		'Hora',
		'Paciente',
		'Médico',
		'Especialidad',
		'Edificio',
		'Estado',
		'Acciones'
	]);
	public consultations = signal<IConsultation[]>([]);

	constructor() {
		this.getConsultations();
	}

	private getConsultations() {
		this._consultationService
			.getConsultations()
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((consultations) => this.consultations.set(consultations));
	}

	public showEvent(item: IConsultation) {
		const dialog = this._dialogService.open(SummaryModalComponent, {
			context: { detail: item }
		});

		dialog.onClose.subscribe(() => console.log('closed'));
	}
}
