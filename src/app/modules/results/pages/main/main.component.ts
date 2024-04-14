import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

import {
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbIconModule,
	NbInputModule,
	NbUserModule
} from '@nebular/theme';

const NB_MODULES = [NbCardModule, NbButtonModule, NbIconModule, NbUserModule, NbInputModule, NbDatepickerModule];

const DATA = [
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

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [UpperCasePipe, ...NB_MODULES],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {
	public tableHeadings = signal(['Fecha', 'Paciente', 'Doctor', 'Lugar', 'Acciones']);
	public data = signal(DATA);
}
