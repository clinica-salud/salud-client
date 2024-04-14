import { Component } from '@angular/core';

import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';

const COMPONENTS = [DetailTabComponent];

@Component({
	selector: 'app-diagnosis-treatment',
	standalone: true,
	imports: [...COMPONENTS],
	templateUrl: './diagnosis-treatment.component.html',
	styleUrl: './diagnosis-treatment.component.scss'
})
export class DiagnosisTreatmentComponent {}
