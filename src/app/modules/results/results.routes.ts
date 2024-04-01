import { Routes } from '@angular/router';

import { MainComponent } from '@src/app/modules/results/pages/main/main.component';
import { ResultsComponent } from '@src/app/modules/results/results.component';

export const RESULTS_ROUTES: Routes = [
	{
		path: '',
		component: ResultsComponent,
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
];
