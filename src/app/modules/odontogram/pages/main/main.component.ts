import { Component, inject } from '@angular/core';

import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';

import { AddTreatmentModalComponent } from '@src/app/modules/odontogram/components/add-treatment-modal/add-treatment-modal.component';
import { OdontogramGraphComponent } from '@src/app/modules/odontogram/components/odontogram-graph/odontogram-graph.component';
import { TeethType } from '@src/app/shared/enums/odontogram.enum';

const NB_MODULES = [NbButtonModule, NbIconModule, NbCardModule];
const COMPONENTS = [OdontogramGraphComponent];

@Component({
	selector: 'app-main',
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss'
})
export class MainComponent {
	private _dialogService = inject(NbDialogService);

	public teethType = TeethType.CHILD;

	public changeTeethType() {
		this.teethType = this.teethType === TeethType.ADULT ? TeethType.CHILD : TeethType.ADULT;
	}

	public addTreatment(id?: string) {
		this._dialogService.open(AddTreatmentModalComponent, {
			context: {
				selectedId: id
			}
		});
	}
}
