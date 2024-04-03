import { Component } from '@angular/core';
import { NbButtonModule, NbCardModule, NbIconModule, NbUserModule } from '@nebular/theme';
import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';

const NB_MODULES = [NbCardModule, NbUserModule, NbIconModule, NbButtonModule];
const DIRECTIVES = [WindowDirective];

@Component({
	selector: 'app-summary-modal',
	standalone: true,
	imports: [...NB_MODULES, ...DIRECTIVES],
	templateUrl: './summary-modal.component.html',
	styleUrl: './summary-modal.component.scss'
})
export class SummaryModalComponent {
	public user = {
		name: 'Pantigoso Puraca José Miguel',
		title: 'Paciente'
	};

	public summaryList = [
		{
			icon: 'calendar-outline',
			title: 'Fecha',
			value: '2022-11-01'
		},
		{
			icon: 'clock-outline',
			title: 'Hora',
			value: '10:00'
		},
		{
			icon: 'pin-outline',
			title: 'Lugar',
			value: 'Juliaca'
		},
		{
			icon: 'smiling-face-outline',
			title: 'Tipo de servicio',
			value: 'Especialidad'
		},
		{
			icon: 'person-outline',
			title: 'Odontólogo',
			value: 'Jean Carlos Payana A.'
		},
		{
			icon: 'file-text-outline',
			title: 'Especialidad',
			value: 'Ortodoncista'
		}
	];
}
