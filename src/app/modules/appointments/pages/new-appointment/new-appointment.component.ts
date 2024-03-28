import { Component } from '@angular/core'

import {
	NbButtonModule,
	NbCalendarModule,
	NbCardModule,
	NbCheckboxModule,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbTimepickerModule,
	NbUserModule
} from '@nebular/theme'

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
]

interface User {
	name: string
	title: string
}

@Component({
	selector: 'app-new-appointment',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './new-appointment.component.html',
	styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {
	public date = new Date()
	public users: User[] = [
		{ name: 'Carla Espinosa', title: 'Ortodoncista' },
		{ name: 'Bob Kelso', title: 'Endodoncista' },
		{ name: 'Janitor', title: 'Dentista General' }
	]
	public options = [
		{ value: 'am', label: 'AM' },
		{ value: 'pm', label: 'PM' }
	]
}
