import { Routes } from '@angular/router';

import { OdontogramComponent } from '@src/app/modules/odontogram/odontogram.component';
import { MainComponent } from '@src/app/modules/odontogram/pages/main/main.component';

export const ODONTOGRAM_ROUTES: Routes = [
	{
		path: '',
		component: OdontogramComponent,
		children: [
			{
				path: '',
				component: MainComponent
			}
		]
	}
];
