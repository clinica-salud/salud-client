import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';
import { AddRecipeModalComponent } from '@src/app/modules/medical-consultations/components/add-recipe-modal/add-recipe-modal.component';

import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';
import { DiagnosisModalComponent } from '@src/app/modules/medical-consultations/components/diagnosis-modal/diagnosis-modal.component';

const COMPONENTS = [DetailTabComponent, NbCardModule, NbIconModule, NbButtonModule];

@Component({
	selector: 'app-diagnosis-treatment',
	standalone: true,
	imports: [...COMPONENTS],
	templateUrl: './diagnosis-treatment.component.html',
	styleUrl: './diagnosis-treatment.component.scss'
})
export class DiagnosisTreatmentComponent {
	private _dialogService = inject(NbDialogService);
	private _activatedRoute = inject(ActivatedRoute);

	private consultaid = signal<number>(0);

	constructor() {
		this._activatedRoute.params.subscribe((params: Params) =>
			this.consultaid.set(params['consultaid'])
		);
	}

	public showDiagnosis() {
		const dialog = this._dialogService.open(DiagnosisModalComponent, {
			context: { consultaid: this.consultaid() }
		});
		dialog.onClose.subscribe(() => console.log('closed'));
	}

	public addRecipe() {
		const dialog = this._dialogService.open(AddRecipeModalComponent, {
			context: {}
		});
		dialog.onClose.subscribe(() => console.log('closed'));
	}
}
