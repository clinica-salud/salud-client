import { Routes } from '@angular/router';

import { MedicalConsultationsComponent } from '@src/app/modules/medical-consultations/medical-consultations.component';
import { DetailComponent } from '@src/app/modules/medical-consultations/pages/detail/detail.component';
import { MainComponent } from '@src/app/modules/medical-consultations/pages/main/main.component';
import { formatRoute } from '@src/app/shared/utils';

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
				path: 'detail/:consultaid',
				component: DetailComponent,
				data: { breadcrumb: (id: string) => `Cita n° ${formatRoute(id)}` }
			}
		]
	}
];
