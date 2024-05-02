import { Component, inject } from '@angular/core';

import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';

import { AddTreatmentModalComponent } from '@src/app/modules/medical-consultations/components/add-treatment-modal/add-treatment-modal.component';
import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';
import { OdontogramGraphComponent } from '@src/app/modules/medical-consultations/components/odontogram-graph/odontogram-graph.component';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { OdontogramService } from '@src/app/shared/services';

const NB_MODULES = [NbButtonModule, NbIconModule, NbCardModule];
const COMPONENTS = [OdontogramGraphComponent, DetailTabComponent];

@Component({
	selector: 'app-odontogram',
	standalone: true,
	imports: [...COMPONENTS, ...NB_MODULES],
	templateUrl: './odontogram.component.html',
	styleUrl: './odontogram.component.scss'
})
export class OdontogramComponent {
	private _dialogService = inject(NbDialogService);
	private _odontogramService = inject(OdontogramService);

	get teethType() {
		return this._odontogramService.teethType;
	}

	get teeth() {
		return this._odontogramService.teeth;
	}

	constructor() {
		this._odontogramService.getTeethPieces();
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
