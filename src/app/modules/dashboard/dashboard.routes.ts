import { Routes } from '@angular/router'
import { DashboardComponent } from '@src/app/modules/dashboard/dashboard.component'
import { MainComponent } from '@src/app/modules/dashboard/pages/main/main.component'

export const DASHBOARD_ROUTES: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				component: MainComponent
			}
		]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: ''
	}
]
