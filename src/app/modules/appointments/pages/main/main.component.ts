import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbOptionModule,
	NbSelectModule,
	NbUserModule
} from '@nebular/theme';

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
	NbOptionModule,
	NbSelectModule,
	NbUserModule
];

@Component({
	standalone: true,
	imports: [UpperCasePipe, ReactiveFormsModule, ...NB_MODULES],
	templateUrl: './main.component.html'
})
export class MainComponent {
	private _destroyRef = inject(DestroyRef);
	private _router = inject(Router);
	private _fb = inject(FormBuilder);
	private _datePipe = inject(DatePipe);
	private _setupService = inject(SetupService);
	private _appointmentService = inject(AppointmentService);

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

	// public appointments = toSignal(this._appointmentService.getAppointments());
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

		this.getAppointments();
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

	public goToAppointment(id: number) {
		this._router.navigate(['/pages/medical-consultations/detail', id]);
	}
}
