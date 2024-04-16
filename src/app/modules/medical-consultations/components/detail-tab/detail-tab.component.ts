import { Component } from '@angular/core';

import { NbCardModule } from '@nebular/theme';

const NB_MODULES = [NbCardModule];

@Component({
	selector: 'app-detail-tab',
	standalone: true,
	imports: [...NB_MODULES],
	template: `
		<nb-card class="border-0 m-0">
			<nb-card-body class="px-0 px-md-4 py-3 py-md-4">
				<ng-content></ng-content>
			</nb-card-body>
		</nb-card>
	`
})
export class DetailTabComponent {}
