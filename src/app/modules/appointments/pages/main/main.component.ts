import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbOptionModule,
	NbSelectModule,
	NbUserModule
} from '@nebular/theme';

const NB_MODULES = [
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbOptionModule,
	NbSelectModule,
	NbUserModule
];

const USER = {
	name: 'Pantigoso Puraca José Miguel',
	title: 'Titular de la cuenta'
};

const DATA = [
	{
		id: 1,
		date: '22/03/2024',
		hour: '08:15:00',
		patient: 'Esperanza Ortiz Flores',
		doctor: 'Andres Chumbiray R.',
		speciality: 'Ortodoncia',
		consultory: 'Consultorio - 1',
		status: 'Cancelado'
	},
	{
		id: 2,
		date: '22/03/2024',
		hour: '08:15:00',
		patient: 'Esperanza Ortiz Flores',
		doctor: 'Andres Chumbiray R.',
		speciality: 'Ortodoncia',
		consultory: 'Consultorio - 1',
		status: 'Próximo'
	},
	{
		id: 3,
		date: '22/03/2024',
		hour: '08:15:00',
		patient: 'Esperanza Ortiz Flores',
		doctor: 'Andres Chumbiray R.',
		speciality: 'Ortodoncia',
		consultory: 'Consultorio - 1',
		status: 'Cancelado'
	}
];

@Component({
	standalone: true,
	imports: [UpperCasePipe, ...NB_MODULES],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {
	private _router = inject(Router);

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

	public goToAppointment(id: number) {
		this._router.navigate(['/pages/medical-consultations/detail', id]);
	}
}
