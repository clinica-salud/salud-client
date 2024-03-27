import { Routes } from '@angular/router'

import { AuthComponent } from '@src/app/core/auth/auth.component'
import { LoginComponent } from '@src/app/core/auth/pages/login/login.component'

export const AUTH_ROUTES: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{ path: '', pathMatch: 'full', redirectTo: 'login' },
			{ path: '**', redirectTo: 'login' }
		]
	}
]
