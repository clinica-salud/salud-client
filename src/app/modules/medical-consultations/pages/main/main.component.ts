import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbDialogService,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbSelectModule,
	NbTooltipModule,
	NbUserModule
} from '@nebular/theme';

import {
	OriginSummary,
	SummaryModalComponent
} from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';
import { IConsultation } from '@src/app/shared/models/consultation.model';
import { AppointmentService, ConsultationService } from '@src/app/shared/services';

const NB_MODULES = [
	NbBadgeModule,
	NbButtonModule,
	NbCardModule,
	NbDatepickerModule,
	NbFormFieldModule,
	NbIconModule,
	NbInputModule,
	NbSelectModule,
	NbUserModule,
	NbTooltipModule
];

@Component({
	standalone: true,
	imports: [UpperCasePipe, ReactiveFormsModule, ...NB_MODULES],
	templateUrl: './main.component.html'
})
export class MainComponent {
	private _dialogService = inject(NbDialogService);
	private _consultationService = inject(ConsultationService);
	private _appointmentService = inject(AppointmentService);
	private _fb = inject(FormBuilder);
	private _destroyRef = inject(DestroyRef);
	private _datePipe = inject(DatePipe);

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

	public statuses = toSignal(this._appointmentService.getStatuses());
	public consultations = signal<IConsultation[]>([]);

	public form: FormGroup = this._fb.group({
		fecha_desde: ['', [Validators.required]],
		fecha_hasta: ['', [Validators.required]],
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
		this.getConsultations();
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

	public getConsultations() {
		const params = {
			...this.form.value,
			fecha_desde: this._datePipe.transform(this.form.value['fecha_desde'], 'yyyy-MM-dd')!,
			fecha_hasta: this._datePipe.transform(this.form.value['fecha_hasta'], 'yyyy-MM-dd')!
		};
		this._consultationService
			.getConsultations(params)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((data) => this.consultations.set(data));
	}

	public showEvent(item: IConsultation) {
		const dialog = this._dialogService.open(SummaryModalComponent, {
			context: { detail: item, id: item.citaid, origin: OriginSummary.CONSULTATION }
		});
		// dialog.onClose.subscribe(() => console.log('closed'));
	}
}
