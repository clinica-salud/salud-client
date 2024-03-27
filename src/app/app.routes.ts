import { Routes } from '@angular/router'

import { LayoutComponent } from '@src/app/core/layout/layout.component'
import { NotFoundComponent } from '@src/app/modules/not-found/not-found.component'

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./core/auth/auth.routes').then((m) => m.AUTH_ROUTES)
	},
	{
		path: 'pages',
		component: LayoutComponent,
		data: { breadcrumb: 'Amaro' },
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./modules/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
				data: { breadcrumb: { skip: true } }
			},
			{
				path: 'appointments',
				loadChildren: () => import('./modules/appointments/appointments.routes').then((m) => m.APPOINTMENTS_ROUTES),
				data: { breadcrumb: 'Mis citas' }
			},
			{
				path: 'medical-consultations',
				loadChildren: () =>
					import('./modules/medical-consultations/medical-consultations.routes').then(
						(m) => m.MEDICAL_CONSULTATIONS_ROUTES
					),
				data: { breadcrumb: 'Consultas médicas' }
			},
			{
				path: 'results',
				loadChildren: () => import('./modules/results/results.routes').then((m) => m.RESULTS_ROUTES),
				data: { breadcrumb: 'Resultados' }
			},
			{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
			{ path: '**', component: NotFoundComponent }
		]
	},
	{ path: '', pathMatch: 'full', redirectTo: 'pages' },
	{ path: '**', redirectTo: 'pages' }
]
