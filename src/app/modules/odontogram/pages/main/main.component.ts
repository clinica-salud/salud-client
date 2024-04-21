import { Component, inject } from '@angular/core';

import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';

import { AddTreatmentModalComponent } from '@src/app/modules/odontogram/components/add-treatment-modal/add-treatment-modal.component';
import { OdontogramGraphComponent } from '@src/app/modules/odontogram/components/odontogram-graph/odontogram-graph.component';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { OdontogramService } from '@src/app/shared/services';

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
	private _odontogramService = inject(OdontogramService);

	get teethType() {
		return this._odontogramService.teethType;
	}

	public toggleTeethType() {
		this._odontogramService.teethType = this.teethType === 1 ? 2 : 1;
	}

	public addTreatment(tooth?: ITooth) {
		const dialog = this._dialogService.open(AddTreatmentModalComponent, {
			context: {
				selectedTooth: tooth
			}
		});
		dialog.onClose.subscribe(() => console.log('closed'));
	}
}
