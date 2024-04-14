import { Component } from '@angular/core';

import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';

const COMPONENTS = [DetailTabComponent];

@Component({
	selector: 'app-history',
	standalone: true,
	imports: [...COMPONENTS],
	templateUrl: './history.component.html',
	styleUrl: './history.component.scss'
})
export class HistoryComponent {}
