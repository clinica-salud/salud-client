import { UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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

	public user = {
		name: 'Pantigoso Puraca José Miguel',
		title: 'Titular de la cuenta'
	};
	public tableHeadings = ['Fecha', 'Tipo', 'Paciente', 'Odontologo', 'Sede', 'Acciones'];
	public data = [
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

	public goToCalendar() {
		this._router.navigate(['calendar'], { relativeTo: this._activatedRoute });
	}
}
