import { Component, inject, signal } from '@angular/core';

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

const USERS: User[] = [
	{ name: 'Carla Espinosa', title: 'Ortodoncista' },
	{ name: 'Bob Kelso', title: 'Endodoncista' },
	{ name: 'Janitor', title: 'Dentista General' }
];

const MORNING_TIMES = [
	{ value: '08:15', title: '8:15 AM', selected: false },
	{ value: '08:30', title: '8:30 AM', selected: false },
	{ value: '08:45', title: '8:45 AM', selected: true },
	{ value: '09:00', title: '9:00 AM', selected: false }
];

const AFTERNOON_TIMES = [
	{ value: '12:00', title: '12:00 PM', selected: false },
	{ value: '12:15', title: '12:15 PM', selected: true },
	{ value: '12:30', title: '12:30 PM', selected: false },
	{ value: '12:45', title: '12:45 PM', selected: false }
];

@Component({
	selector: 'app-new-appointment',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './new-appointment.component.html',
	styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {
	private _dialogService = inject(NbDialogService);

	public users = signal(USERS);
	public morning_times = signal(MORNING_TIMES);
	public afternoon_times = signal(AFTERNOON_TIMES);

	public selectMorningTime(time: string) {
		this.morning_times.update((times) => times.map((t) => ({ ...t, selected: t.value === time })));
	}

	public selectAfternoonTime(time: string) {
		this.afternoon_times.update((times) => times.map((t) => ({ ...t, selected: t.value === time })));
	}

	public saveAppointment() {
		this._dialogService.open(SummaryModalComponent);
	}
}
