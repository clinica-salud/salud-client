import { Routes } from '@angular/router';

import { AppointmentsComponent } from '@src/app/modules/appointments/appointments.component';
import { NewAppointmentComponent } from '@src/app/modules/appointments/pages/new-appointment/new-appointment.component';

export const APPOINTMENTS_ROUTES: Routes = [
	{
		path: '',
		component: AppointmentsComponent,
		children: [
			{
				path: 'new-appointment',
				component: NewAppointmentComponent,
				data: { breadcrumb: 'Nueva cita' }
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'new-appointment'
			}
		]
	}
];
