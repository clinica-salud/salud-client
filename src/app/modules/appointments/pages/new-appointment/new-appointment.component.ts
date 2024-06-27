import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDateFnsDateModule } from '@nebular/date-fns';

import {
	NbButtonModule,
	NbCalendarModule,
	NbCardModule,
	NbCheckboxModule,
	NbDialogService,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbRadioModule,
	NbTimepickerModule,
	NbUserModule
} from '@nebular/theme';
import { SummaryModalComponent } from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';

import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component';
import { IDoctor, ITypesService, ITypesSpeciality, ITypesTreatment } from '@src/app/shared/models';
import { AppointmentService, SetupService } from '@src/app/shared/services';

const NB_MODULES = [
	NbButtonModule,
	NbCalendarModule,
	NbCardModule,
	NbCheckboxModule,
	NbIconModule,
	NbInputModule,
	NbListModule,
	NbRadioModule,
	NbTimepickerModule,
	NbUserModule,
	NbDateFnsDateModule
];
const COMPONENTS = [ControlErrorComponent];

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, CurrencyPipe, ...NB_MODULES, ...COMPONENTS],
	templateUrl: './new-appointment.component.html',
	styleUrl: './new-appointment.component.scss'
})
export class NewAppointmentComponent {
	private _destroyRef = inject(DestroyRef);
	private _dialogService = inject(NbDialogService);
	private _activatedRoute = inject(ActivatedRoute);
	private _setupService = inject(SetupService);
	private _fb = inject(FormBuilder);
	private _datePipe = inject(DatePipe);
	private _appointmentService = inject(AppointmentService);

	private selectedDate$ = signal(new Date());

	public today = signal(new Date());

	public pacient = signal('');
	public pacientId = signal(0);

	public typesServices = signal<ITypesService[]>([]);
	public typesSpecialities = signal<ITypesSpeciality[]>([]);
	public typesTreatments = signal<ITypesTreatment[]>([]);
	public doctors = signal<IDoctor[]>([]);
	public cost = signal<number>(0);
	public showCostInput = signal(false);

	public form: FormGroup = this._fb.group({
		dni: [
			'',
			[
				Validators.required,
				Validators.minLength(8),
				Validators.maxLength(8),
				Validators.pattern('^[0-9]*$')
			]
		],
		tiposervicioid: ['', [Validators.required]],
		especialidadid: ['', [Validators.required]],
		tipotratamientoid: [''],
		medicoid: ['', [Validators.required]],
		hora: ['', [Validators.required]],
		costo: [''],
		observacion: ['']
	});

	constructor() {
		this.today().setHours(0, 0, 0, 0);

		const date = this._activatedRoute.snapshot.queryParams['date'];
		if (date) this.selectedDate$.set(new Date(date));

		this.getTypesServices();
		this.subscribeForms();
	}

	get f() {
		return this.form.controls;
	}

	get selectedDate() {
		return this.selectedDate$();
	}

	set selectedDate(date: Date) {
		this.selectedDate$.set(date);
	}

	private subscribeForms() {
		this.f['tiposervicioid'].valueChanges.subscribe((val) => {
			if (val === 1) this.getTypesSpecialties();
			if (val === 2) this.getTypesTreatments();
		});

		this.f['tipotratamientoid'].valueChanges.subscribe((val) => {
			this.doctors.set([]);
			if (val === 3) this.getDoctors(val);
		});

		this.f['especialidadid'].valueChanges.subscribe((val) => {
			this.doctors.set([]);
			if (val === 1) this.getDoctors(val);
		});

		this.f['medicoid'].valueChanges.subscribe((val) => {
			if (val) this.getCost();
		});
	}

	private getPersonByDNI() {
		const dni = this.f['dni'].value;
		if (!dni || dni.length !== 8) return;

		this._setupService
			.getPersonByDNI(dni)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((person) => {
				this.f['dni'].setValue(person.dni);
				this.pacient.set(person.ape_pat + ' ' + person.ape_mat + ' ' + person.nombre);
				this.pacientId.set(person.personaid);
			});
	}

	public searchByDNI() {
		// this.f['dni'].setValue('');
		this.pacient.set('');

		this.getPersonByDNI();
	}

	public getTypesServices() {
		this._setupService
			.getTypesServices()
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((typesServices) => {
				this.typesServices.set(typesServices);
				const defaultService = typesServices[0].tiposervicioid || '';
				this.f['tiposervicioid'].setValue(defaultService);
			});
	}

	public getTypesSpecialties() {
		this._setupService
			.getTypesSpecialities()
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((typesSpecialties) => this.typesSpecialities.set(typesSpecialties));
	}

	public getTypesTreatments() {
		this._setupService
			.getTypesTreatments()
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((typesTreatments) => this.typesTreatments.set(typesTreatments));
	}

	public getDoctors(tratamientoid: number) {
		// console.log(tratamientoid);
		this._setupService
			.getDoctors()
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((doctors) => this.doctors.set(doctors));
	}

	public getCost() {
		const params = {
			tiposervicioid: this.f['tiposervicioid'].value,
			medicoid: this.f['medicoid'].value,
			especialidadid: this.f['especialidadid'].value
		};

		this._setupService
			.getCost(params)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((cost) => this.cost.set(cost.costo));
	}

	public toggleCostInput() {
		this.showCostInput.set(!this.showCostInput());
		this.f['costo'].setValue(this.cost());
	}

	public saveCost() {
		this.showCostInput.set(false);
		this.cost.set(this.f['costo'].value);
	}

	public saveAppointment() {
		const data = {
			...this.form.value,
			pacienteid: this.pacientId(),
			fecha: this._datePipe.transform(this.selectedDate, 'yyyy-MM-dd'),
			hora: this._datePipe.transform(this.f['hora'].value, 'HH:mm:ss'),
			costo: Number(this.cost())
		};

		this._appointmentService
			.addAppointment(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((appointment) =>
				this._dialogService.open(SummaryModalComponent, {
					context: { detail: appointment, id: appointment.citaid }
				})
			);
	}
}
