import { Component } from '@angular/core';
import { NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';
import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';

const NB_MODULES = [NbCardModule, NbTabsetModule, NbIconModule];
const COMPONENTS = [DetailTabComponent];

@Component({
	selector: 'app-detail',
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export class DetailComponent {}
