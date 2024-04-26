import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbIconModule,
	NbInputModule,
	NbUserModule
} from '@nebular/theme';

const NB_MODULES = [NbCardModule, NbButtonModule, NbIconModule, NbUserModule, NbInputModule, NbDatepickerModule];

const USER = {
	name: 'Pantigoso Puraca José Miguel',
	title: 'Titular de la cuenta'
};

const DATA = [
	{
		id: 1,
		date: '22/03/2024',
		type: 'Especialidad',
		patient: 'Titular',
		doctor: 'Andres Chumbiray R.',
		location: 'Lima'
	},
	{
		id: 2,
		date: '22/03/2024',
		type: 'Especialidad',
		patient: 'Titular',
		doctor: 'Andres Chumbiray R.',
		location: 'Lima'
	},
	{
		id: 3,
		date: '22/03/2024',
		type: 'Especialidad',
		patient: 'Titular',
		doctor: 'Andres Chumbiray R.',
		location: 'Lima'
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
	public tableHeadings = signal(['Fecha', 'Tipo', 'Paciente', 'Doctor', 'Ubicación', 'Acciones']);
	public data = signal(DATA);

	public goToAppointment(id: number) {
		console.log(id);
		this._router.navigate(['/pages/medical-consultations/detail', id]);
	}
}
