import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
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
		status: 'Cancelado'
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
	selector: 'app-main',
	standalone: true,
	imports: [UpperCasePipe, ...NB_MODULES],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {
	private _router = inject(Router);
	private _activatedRoute = inject(ActivatedRoute);

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
		console.log(id);
		this._router.navigate(['/pages/medical-consultations/detail', id]);
	}
}
