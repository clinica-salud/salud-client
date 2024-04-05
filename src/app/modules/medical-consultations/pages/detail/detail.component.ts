import { Component } from '@angular/core';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';

const NB_MODULES = [NbCardModule, NbTabsetModule];

@Component({
	selector: 'app-detail',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export class DetailComponent {}
