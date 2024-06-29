import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, Input, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import {
	NbButtonModule,
	NbCardModule,
	NbDialogRef,
	NbIconModule,
	NbUserModule
} from '@nebular/theme';

import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';
import { AppointmentService } from '@src/app/shared/services';

const NB_MODULES = [NbCardModule, NbUserModule, NbIconModule, NbButtonModule];
const DIRECTIVES = [WindowDirective];

export enum SummaryType {
	PENDING = 'Pendiente',
	CONFIRMED = 'Confirmada',
	CANCELLED = 'Cancelada',
	FINISHED = 'Finalizada'
}

export enum OriginSummary {
	APPOINTMENT = 'appointment',
	CALENDAR = 'calendar',
	CONSULTATION = 'consultation'
}

@Component({
	selector: 'app-summary-modal',
	standalone: true,
	imports: [CurrencyPipe, ...NB_MODULES, ...DIRECTIVES],
	templateUrl: './summary-modal.component.html'
})
export class SummaryModalComponent implements OnInit {
	private _router = inject(Router);
	private _dialogRef = inject(NbDialogRef<SummaryModalComponent>);
	private _appointmentService = inject(AppointmentService);
	private _destroyRef = inject(DestroyRef);

	@Input() detail!: any;
	@Input() id!: number;
	@Input() origin: string = OriginSummary.APPOINTMENT;

	public appointment = signal<any>({} as any);

	ngOnInit(): void {
		this.getAppointmentById();
	}

	private getAppointmentById() {
		this._appointmentService
			.getAppointmentById(this.id)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((res) => this.appointment.set(res));
	}

	public backToOrigin() {
		if (this.origin === OriginSummary.APPOINTMENT) {
			this._router.navigateByUrl('/pages/appointments');
			this.close();
		} else if (this.origin === OriginSummary.CALENDAR) {
			this.close();
		} else if (this.origin === OriginSummary.CONSULTATION) {
			this.close();
		}
	}

	public viewDetail() {
		if (!this.detail) return;

		this._router.navigateByUrl(`/pages/medical-consultations/detail/${this.detail.consultaid}`);
		this._dialogRef.close();
	}

	public close() {
		this._dialogRef.close();
	}
}
