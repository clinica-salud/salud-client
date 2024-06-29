import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
	NbTooltipModule,
	NbUserModule
} from '@nebular/theme';
import {
	AppointmentService,
	ConsultationService,
	ResultService,
	SetupService
} from '@src/app/shared/services';

const NB_MODULES = [
	NbCardModule,
	NbButtonModule,
	NbIconModule,
	NbUserModule,
	NbInputModule,
	NbDatepickerModule,
	NbTooltipModule,
	NbOptionModule,
	NbSelectModule,
	NbFormFieldModule,
	NbBadgeModule
];

@Component({
	standalone: true,
	imports: [UpperCasePipe, ReactiveFormsModule, ...NB_MODULES],
	templateUrl: './main.component.html'
})
export class MainComponent {
	private _fb = inject(FormBuilder);
	private _resultService = inject(ResultService);
	private _datePipe = inject(DatePipe);
	private _destroyRef = inject(DestroyRef);
	private _consultationService = inject(ConsultationService);
	private _setupService = inject(SetupService);
	private _appointmentService = inject(AppointmentService);

	public tableHeadings = signal([
		'Fecha',
		'Edificio',
		'Especialidad',
		'Médico',
		'Paciente',
		'Estado',
		'Acciones'
	]);
	public results = signal<any[]>([]);

	public buildings = toSignal(this._setupService.getBuildings());
	public specialities = toSignal(this._setupService.getTypesSpecialities());
	public doctors = toSignal(this._setupService.getDoctors());
	public statuses = toSignal(this._appointmentService.getStatuses());

	public form: FormGroup = this._fb.group({
		fecha_desde: ['', [Validators.required]],
		fecha_hasta: ['', [Validators.required]],
		edificioid: [''],
		especialidadid: [''],
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
		this.getResults();
	}

	private subscribeForms() {}

	public getResults() {
		const params = {
			...this.form.value,
			fecha_desde: this._datePipe.transform(this.form.value['fecha_desde'], 'yyyy-MM-dd')!,
			fecha_hasta: this._datePipe.transform(this.form.value['fecha_hasta'], 'yyyy-MM-dd')!
		};
		this._resultService
			.getResults(params)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((results) => this.results.set(results));
	}

	public downloadPDF(consultaid: number) {
		this._consultationService
			.generatePDF(consultaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `Historia_Clinica_${consultaid}.pdf`;
				document.body.appendChild(a);
				a.click();
				a.remove();
				window.URL.revokeObjectURL(url);
			});
	}
}
