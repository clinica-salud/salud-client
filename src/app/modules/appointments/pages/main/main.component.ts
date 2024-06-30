import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbDialogService,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbOptionModule,
	NbSelectModule,
	NbTooltipModule,
	NbUserModule
} from '@nebular/theme';
import { ChangeStatusModalComponent } from '@src/app/modules/appointments/components/change-status-modal/change-status-modal.component';

import { IAppointment } from '@src/app/shared/models/appointment.model';
import { AppointmentService, SetupService } from '@src/app/shared/services';

const NB_MODULES = [
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbOptionModule,
	NbSelectModule,
	NbUserModule,
	NbTooltipModule
];

@Component({
	standalone: true,
	imports: [UpperCasePipe, ReactiveFormsModule, RouterLink, ...NB_MODULES],
	templateUrl: './main.component.html',
	styles: ['.status:hover { cursor: pointer;  background: #f5f5f5; }']
})
export class MainComponent {
	private _destroyRef = inject(DestroyRef);
	private _fb = inject(FormBuilder);
	private _datePipe = inject(DatePipe);
	private _setupService = inject(SetupService);
	private _appointmentService = inject(AppointmentService);
	private _dialogService = inject(NbDialogService);

	public tableHeadings = signal([
		'Fecha',
		'Hora',
		'Paciente',
		'Médico',
		'Especialidad',
		'Edificio',
		'Estado',
		'Acciones'
	]);

	public doctors = toSignal(this._setupService.getDoctors());
	public statuses = toSignal(this._appointmentService.getStatuses());

	public appointments = signal<IAppointment[]>([]);

	public form: FormGroup = this._fb.group({
		fecha_desde: ['', [Validators.required]],
		fecha_hasta: ['', [Validators.required]],
		medicoid: [''],
		paciente: [''],
		estadoid: ['']
	});

	get f() {
		return this.form.controls;
	}

	constructor() {
		this.f['fecha_desde'].setValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
		this.f['fecha_hasta'].setValue(new Date());

		this.subscribeForms();
		this.getAppointments();
	}

	private subscribeForms() {
		this.f['fecha_desde'].valueChanges
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((value) => {
				if (this.f['fecha_hasta'].value < value) {
					this.f['fecha_hasta'].setValue(value);
				}
			});

		this.f['fecha_hasta'].valueChanges
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((value) => {
				if (this.f['fecha_desde'].value > value) {
					this.f['fecha_desde'].setValue(value);
				}
			});
	}

	public getAppointments() {
		const params = {
			...this.form.value,
			fecha_desde: this._datePipe.transform(this.form.value['fecha_desde'], 'yyyy-MM-dd')!,
			fecha_hasta: this._datePipe.transform(this.form.value['fecha_hasta'], 'yyyy-MM-dd')!
		};
		this._appointmentService
			.getAppointments(params)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((appointments) => this.appointments.set(appointments));
	}

	public openStatusModal(citaid: number, estadoid: number) {
		const dialog = this._dialogService.open(ChangeStatusModalComponent, {
			context: { citaid, estadoid, statuses: this.statuses() }
		});

		dialog.onClose.subscribe(({ cancel }) => {
			if (cancel) return;
			this.getAppointments();
		});
	}
}
