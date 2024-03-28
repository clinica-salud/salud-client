import { Component } from '@angular/core'

import { NbCardModule } from '@nebular/theme'

const NB_MODULES = [NbCardModule]

@Component({
	selector: 'app-new-appointment',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './new-appointment.component.html',
	styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {}
