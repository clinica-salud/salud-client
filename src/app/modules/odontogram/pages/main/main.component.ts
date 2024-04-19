import { Component, inject } from '@angular/core';

import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';
import { AddTreatmentModalComponent } from '@src/app/modules/odontogram/components/add-treatment-modal/add-treatment-modal.component';

import { AdultComponent } from '@src/app/modules/odontogram/components/adult/adult.component';

const NB_MODULES = [NbButtonModule, NbIconModule, NbCardModule];
const COMPONENTS = [AdultComponent];

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {
	private _dialogService = inject(NbDialogService);

	public addTreatment(id?: string) {
		this._dialogService.open(AddTreatmentModalComponent, {
			context: {
				selectedId: id
			}
		});
	}
}
