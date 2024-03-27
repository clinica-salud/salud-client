import { Routes } from '@angular/router'

import { MedicalConsultationsComponent } from '@src/app/modules/medical-consultations/medical-consultations.component'
import { MainComponent } from '@src/app/modules/medical-consultations/pages/main/main.component'

export const MEDICAL_CONSULTATIONS_ROUTES: Routes = [
	{
		path: '',
		component: MedicalConsultationsComponent,
		children: [
			{
				path: '',
				component: MainComponent
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: ''
			}
		]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: ''
	}
]
