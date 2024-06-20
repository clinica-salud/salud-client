import { Component, DestroyRef, Input, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NbButtonModule, NbCardModule, NbDialogRef, NbIconModule } from '@nebular/theme';

import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';
import { ConsultationService } from '@src/app/shared/services';

const NB_MODULES = [NbCardModule, NbIconModule, NbButtonModule];
const DIRECTIVES = [WindowDirective];

@Component({
	selector: 'app-diagnosis-modal',
	standalone: true,
	imports: [...NB_MODULES, ...DIRECTIVES],
	templateUrl: './diagnosis-modal.component.html'
})
export class DiagnosisModalComponent {
	private _dialogRef = inject(NbDialogRef<DiagnosisModalComponent>);
	private _consultationService = inject(ConsultationService);
	private _destroyRef = inject(DestroyRef);

	@Input() set consultaid(consultaid: number) {
		this.getOdontogramConsultations(consultaid);
	}

	public odontogramConsultations = signal<any[]>([]);

	private getOdontogramConsultations(consultaid: number) {
		this._consultationService
			.getOdontogramConsultations(consultaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((data: any) => this.odontogramConsultations.set(data));
	}

	public close() {
		this._dialogRef.close();
	}
}
