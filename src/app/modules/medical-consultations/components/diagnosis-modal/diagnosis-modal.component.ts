import { Component, inject } from '@angular/core';

import { NbButtonModule, NbCardModule, NbDialogRef, NbIconModule } from '@nebular/theme';

import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';

const NB_MODULES = [NbCardModule, NbIconModule, NbButtonModule];
const DIRECTIVES = [WindowDirective];

@Component({
	selector: 'app-diagnosis-modal',
	standalone: true,
	imports: [...NB_MODULES, ...DIRECTIVES],
	templateUrl: './diagnosis-modal.component.html',
	styleUrl: './diagnosis-modal.component.scss'
})
export class DiagnosisModalComponent {
	private _dialogRef = inject(NbDialogRef<DiagnosisModalComponent>);

	public close() {
		this._dialogRef.close();
	}
}
