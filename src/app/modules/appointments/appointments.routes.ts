import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { AppointmentsComponent } from '@src/app/modules/appointments/appointments.component';
import { CalendarComponent } from '@src/app/modules/appointments/pages/calendar/calendar.component';
import { MainComponent } from '@src/app/modules/appointments/pages/main/main.component';
import { NewAppointmentComponent } from '@src/app/modules/appointments/pages/new-appointment/new-appointment.component';
import { AppointmentService } from '@src/app/shared/services';

export const APPOINTMENTS_ROUTES: Routes = [
	{
		path: '',
		component: AppointmentsComponent,
		children: [
			{
				path: '',
				component: MainComponent
			},
			{
				path: 'calendar',
				component: CalendarComponent,
				data: { breadcrumb: 'Calendario' }
			},
			{
				path: 'new',
				component: NewAppointmentComponent,
				data: { breadcrumb: 'Nueva cita' }
			},
			{
				path: 'edit/:citaid',
				component: NewAppointmentComponent,
				data: { breadcrumb: 'Editar cita' },
				resolve: {
					appoinment: (route: ActivatedRouteSnapshot) => {
						const _appointmentService = inject(AppointmentService);
						const citaid = route.params['citaid'];

						return _appointmentService.getAppointmentById(citaid);
					}
				}
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: ''
			}
		]
	}
];
