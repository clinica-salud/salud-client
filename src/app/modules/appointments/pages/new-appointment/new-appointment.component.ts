import { Component, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
	NbButtonModule,
	NbCalendarModule,
	NbCardModule,
	NbCheckboxModule,
	NbDialogService,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbRadioModule,
	NbTimepickerModule,
	NbUserModule
} from '@nebular/theme';

import { SummaryModalComponent } from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';

const NB_MODULES = [
	NbButtonModule,
	NbCalendarModule,
	NbCardModule,
	NbCheckboxModule,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbRadioModule,
	NbTimepickerModule,
	NbUserModule
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
	{ value: '08:45', title: '8:45 AM', selected: false },
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
	private _activatedRoute = inject(ActivatedRoute);

	private selectedDate$: FormControl = new FormControl(new Date());

	public today = signal(new Date());
	public users = signal(USERS);
	public morning_times = signal(MORNING_TIMES);
	public afternoon_times = signal(AFTERNOON_TIMES);

	constructor() {
		this.today().setHours(0, 0, 0, 0);

		const date = this._activatedRoute.snapshot.queryParams['date'];
		if (date) this.selectedDate$.setValue(new Date(date));
	}

	get selectedDate() {
		return this.selectedDate$.value;
	}

	set selectedDate(date: Date) {
		this.selectedDate$.setValue(date);
	}

	public selectTime(time: string) {
		this.morning_times.update((times) => times.map((t) => ({ ...t, selected: t.value === time })));
		this.afternoon_times.update((times) => times.map((t) => ({ ...t, selected: t.value === time })));
	}

	public saveAppointment() {
		this._dialogService.open(SummaryModalComponent);
	}
}
