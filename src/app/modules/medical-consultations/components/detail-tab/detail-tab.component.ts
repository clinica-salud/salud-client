import { Component } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

const NB_MODULES = [NbCardModule];

@Component({
	selector: 'app-detail-tab',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './detail-tab.component.html',
	styleUrl: './detail-tab.component.scss'
})
export class DetailTabComponent {}
