import { Component } from '@angular/core'

import { NbCardModule } from '@nebular/theme'

const NB_MODULES = [NbCardModule]

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {}
