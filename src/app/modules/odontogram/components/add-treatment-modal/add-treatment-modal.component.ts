import { Component, Input, OnInit } from '@angular/core';

import { NbButtonModule, NbCardModule, NbIconModule, NbOptionModule, NbSelectModule } from '@nebular/theme';

import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';

const NB_MODULES = [NbCardModule, NbIconModule, NbButtonModule, NbSelectModule, NbOptionModule];
const DIRECTIVES = [WindowDirective];

@Component({
	selector: 'app-add-treatment-modal',
	standalone: true,
	imports: [...NB_MODULES, ...DIRECTIVES],
	templateUrl: './add-treatment-modal.component.html',
	styleUrl: './add-treatment-modal.component.scss'
})
export class AddTreatmentModalComponent implements OnInit {
	@Input() selectedId?: string;

	ngOnInit(): void {
		console.log(this.selectedId);
	}
}
