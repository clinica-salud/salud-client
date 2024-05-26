import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
	NbButtonModule,
	NbCardModule,
	NbDialogRef,
	NbIconModule,
	NbUserModule
} from '@nebular/theme';

import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';
import { IConsultation } from '@src/app/shared/models/consultation.model';

const NB_MODULES = [NbCardModule, NbUserModule, NbIconModule, NbButtonModule];
const DIRECTIVES = [WindowDirective];

export enum SummaryType {
	PENDING = 'Pendiente',
	CONFIRMED = 'Confirmada',
	CANCELLED = 'Cancelada',
	FINISHED = 'Finalizada'
}

@Component({
	selector: 'app-summary-modal',
	standalone: true,
	imports: [...NB_MODULES, ...DIRECTIVES],
	templateUrl: './summary-modal.component.html',
	styleUrl: './summary-modal.component.scss'
})
export class SummaryModalComponent {
	private _router = inject(Router);
	private _dialogRef = inject(NbDialogRef<SummaryModalComponent>);

	@Input() detail!: IConsultation;

	public viewDetail() {
		if (!this.detail) return;

		this._router.navigateByUrl(`/pages/medical-consultations/detail/${this.detail.consultaid}`);
		this._dialogRef.close();
	}

	public close() {
		this._dialogRef.close();
	}
}
