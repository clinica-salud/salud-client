import { Component } from '@angular/core';

import { NbCardModule } from '@nebular/theme';

const NB_MODULES = [NbCardModule];

@Component({
	selector: 'app-detail-tab',
	standalone: true,
	imports: [...NB_MODULES],
	template: `
		<nb-card class="border-0 m-0">
			<nb-card-body style="min-height: calc(100dvh - 245px)">
				<ng-content></ng-content>
			</nb-card-body>
		</nb-card>
	`
})
export class DetailTabComponent {}
