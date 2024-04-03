import { Component, inject } from '@angular/core';

import {
	NbButtonModule,
	NbCalendarModule,
	NbCardModule,
	NbCheckboxModule,
	NbDialogService,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbTimepickerModule,
	NbUserModule
} from '@nebular/theme';
import { SummaryModalComponent } from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';

const NB_MODULES = [
	NbCardModule,
	NbInputModule,
	NbButtonModule,
	NbIconModule,
	NbListModule,
	NbUserModule,
	NbCheckboxModule,
	NbCalendarModule,
	NbTimepickerModule
];

interface User {
	name: string;
	title: string;
}

@Component({
	selector: 'app-new-appointment',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './new-appointment.component.html',
	styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {
	private _dialogService = inject(NbDialogService);

	public date = new Date();
	public users: User[] = [
		{ name: 'Carla Espinosa', title: 'Ortodoncista' },
		{ name: 'Bob Kelso', title: 'Endodoncista' },
		{ name: 'Janitor', title: 'Dentista General' }
	];
	public options = [
		{ value: 'am', label: 'AM' },
		{ value: 'pm', label: 'PM' }
	];

	public saveAppointment() {
		this._dialogService.open(SummaryModalComponent);
	}
}
