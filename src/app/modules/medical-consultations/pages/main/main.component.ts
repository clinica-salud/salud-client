import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

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
	templateUrl: './main.component.html'
})
export class MainComponent {
	private _dialogService = inject(NbDialogService);
	private _consultationService = inject(ConsultationService);

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
	public consultations = toSignal(this._consultationService.getConsultations());

	public showEvent(item: IConsultation) {
		const dialog = this._dialogService.open(SummaryModalComponent, {
			context: { detail: item, id: item.consultaid }
		});

		dialog.onClose.subscribe(() => console.log('closed'));
	}
}
