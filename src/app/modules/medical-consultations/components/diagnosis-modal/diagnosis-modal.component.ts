import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
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
	templateUrl: './diagnosis-modal.component.html',
	styleUrl: './diagnosis-modal.component.scss'
})
export class DiagnosisModalComponent implements OnInit {
	private _dialogRef = inject(NbDialogRef<DiagnosisModalComponent>);
	private _consultationService = inject(ConsultationService);
	private _destroyRef = inject(DestroyRef);

	@Input() consultaid!: number;
	public odontogramConsultations = signal<any[]>([]);

	ngOnInit(): void {
		this.getOdontogramConsultations();
	}

	private getOdontogramConsultations() {
		this._consultationService
			.getOdontogramConsultations(this.consultaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((data: any) => this.odontogramConsultations.set(data));
	}

	public close() {
		this._dialogRef.close();
	}
}
