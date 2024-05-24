import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

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

import {
	SummaryModalComponent,
	SummaryType
} from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';

const NB_MODULES = [
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbSelectModule,
	NbUserModule,
	NbBadgeModule
];

const USER = {
	name: 'Pantigoso Puraca José Miguel',
	title: 'Titular de la cuenta'
};

const DATA = [
	{
		id: 1,
		date: '22/03/2024',
		hour: '08:00:00',
		patient: 'Esperanza Ortiz Flores',
		doctor: 'Andres Chumbiray R.',
		speciality: 'Ortodoncia',
		consultory: 'Consultorio - 1',
		status: 'Finalizado'
	},
	{
		id: 2,
		date: '22/03/2024',
		hour: '08:00:00',
		patient: 'Esperanza Ortiz Flores',
		doctor: 'Andres Chumbiray R.',
		speciality: 'Ortodoncia',
		consultory: 'Consultorio - 1',
		status: 'Finalizado'
	},
	{
		id: 3,
		date: '22/03/2024',
		hour: '08:00:00',
		patient: 'Esperanza Ortiz Flores',
		doctor: 'Andres Chumbiray R.',
		speciality: 'Ortodoncia',
		consultory: 'Consultorio - 1',
		status: 'Finalizado'
	}
];

@Component({
	standalone: true,
	imports: [UpperCasePipe, ...NB_MODULES],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {
	private _dialogService = inject(NbDialogService);

	public user = signal(USER);
	public tableHeadings = signal([
		'Fecha',
		'Hora',
		'Paciente',
		'Médico',
		'Especialidad',
		'Consultorio',
		'Estado',
		'Acciones'
	]);
	public data = signal(DATA);

	public showEvent(item: any) {
		this._dialogService.open(SummaryModalComponent, {
			context: {
				summaryType: SummaryType.FINISHED,
				detail: item
			}
		});
		console.log(item);
	}
}
