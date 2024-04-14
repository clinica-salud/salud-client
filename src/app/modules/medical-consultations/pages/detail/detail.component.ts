import { Component } from '@angular/core';

import { NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';

import { DiagnosisTreatmentComponent } from '@src/app/modules/medical-consultations/components/diagnosis-treatment/diagnosis-treatment.component';
import { HistoryComponent } from '@src/app/modules/medical-consultations/components/history/history.component';
import { OdontogramComponent } from '@src/app/modules/medical-consultations/components/odontogram/odontogram.component';

const NB_MODULES = [NbCardModule, NbTabsetModule, NbIconModule];
const COMPONENTS = [OdontogramComponent, HistoryComponent, DiagnosisTreatmentComponent];

@Component({
	selector: 'app-detail',
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export class DetailComponent {}
