import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

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
	public user = {
		name: 'Pantigoso Puraca José Miguel',
		title: 'Titular de la cuenta'
	};
	public tableHeadings = ['Fecha', 'Paciente', 'Odontologo', 'Estado', 'Acciones'];
	public data = [
		{
			id: 1,
			date: '22/03/2024',
			patient: 'Titular',
			doctor: 'Andres Chumbiray R.',
			location: 'Lima'
		},
		{
			id: 2,
			date: '22/03/2024',
			patient: 'Titular',
			doctor: 'Andres Chumbiray R.',
			location: 'Lima'
		},
		{
			id: 3,
			date: '22/03/2024',
			patient: 'Titular',
			doctor: 'Andres Chumbiray R.',
			location: 'Lima'
		}
	];
}
