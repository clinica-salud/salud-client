import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';

import { CalendarModule } from 'angular-calendar';

import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
	OriginSummary,
	SummaryModalComponent,
	SummaryType
} from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';
import { SmallToggleComponent } from '@src/app/shared/components/small-toggle/small-toggle.component';
import { IAppointment } from '@src/app/shared/models';
import { AppointmentService } from '@src/app/shared/services';
import { map } from 'rxjs';

const NB_MODULES = [NbCardModule, NbButtonModule, NbIconModule];
const COMPONENTS = [SmallToggleComponent];
const OTHER_MODULES = [CalendarModule];

const COLORS: { [key: string]: { primary: string; secondary: string } } = {
	PN: {
		primary: 'var(--color-basic-500)',
		secondary: 'var(--color-basic-100)'
	},
	CC: {
		primary: 'var(--color-primary-500)',
		secondary: 'var(--color-primary-100)'
	},
	FIN: {
		primary: 'var(--color-success-500)',
		secondary: 'var(--color-success-100)'
	},
	DEL: {
		primary: 'var(--color-danger-500)',
		secondary: 'var(--color-danger-100)'
	}
};

type EventMeta = {
	type: SummaryType;
	detail: IAppointment;
};

const mapEstadoToEnumKey = (estado: string): keyof typeof SummaryType => {
	switch (estado) {
		case 'Pendiente':
			return 'PENDING';
		case 'Confirmada':
			return 'CONFIRMED';
		case 'Cancelada':
			return 'CANCELLED';
		case 'Finalizada':
			return 'FINISHED';
		default:
			throw new Error(`Unknown estado: ${estado}`);
	}
};

@Component({
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		RouterLink,
		...NB_MODULES,
		...OTHER_MODULES,
		...COMPONENTS
	],
	templateUrl: './calendar.component.html'
})
export class CalendarComponent {
	private _dialogService = inject(NbDialogService);
	private _fb = inject(FormBuilder);
	private _router = inject(Router);
	private _datePipe = inject(DatePipe);
	private _appointmentService = inject(AppointmentService);

	public today = signal(new Date());
	public appointments = toSignal(
		this._appointmentService.getAppointments({}).pipe(
			map((data) =>
				data.map((appointment) => {
					const estadoKey = mapEstadoToEnumKey(appointment.estado);
					return {
						...appointment,
						start: new Date(`${appointment.fecha} ${appointment.hora}`),
						title: '',
						color: { ...COLORS[appointment.estado_abreviatura] },
						meta: {
							type: SummaryType[estadoKey],
							detail: appointment
						}
					};
				})
			)
		)
	);

	// public filteredEvents = signal<CalendarEvent[]>([]);

	// public form = this._fb.group({
	// 	all: [true],
	// 	finished: [false],
	// 	cancelled: [false],
	// 	next: [false]
	// });

	// get allControl() {
	// 	return this.form.controls['all'];
	// }
	// get finishedControl() {
	// 	return this.form.controls['finished'];
	// }
	// get cancelledControl() {
	// 	return this.form.controls['cancelled'];
	// }
	// get nextControl() {
	// 	return this.form.controls['next'];
	// }

	constructor() {
		// this.toggleAll(this.allControl.value!);
		// this.finishedControl.valueChanges.subscribe(() => this.updateAllControl());
		// this.cancelledControl.valueChanges.subscribe(() => this.updateAllControl());
		// this.nextControl.valueChanges.subscribe(() => this.updateAllControl());
	}

	// private updateAllControl() {
	// 	const finishedValue = this.finishedControl.value;
	// 	const cancelledValue = this.cancelledControl.value;
	// 	const nextValue = this.nextControl.value;

	// 	const allValuesAreSet = finishedValue && cancelledValue && nextValue;

	// 	if (allValuesAreSet) {
	// 		this.allControl.patchValue(true);
	// 		return;
	// 	}

	// 	this.allControl.patchValue(false);
	// }

	// public toggleAll(value: boolean) {
	// 	this.finishedControl.setValue(value);
	// 	this.cancelledControl.setValue(value);
	// 	this.nextControl.setValue(value);

	// 	value ? this.filteredEvents.set(this.originalEvents()) : this.filteredEvents.set([]);
	// }

	// public toggleFinished(value: boolean) {
	// 	this.finishedControl.setValue(value);

	// 	const finishedEvents = this.originalEvents().filter(
	// 		(event) => event.meta.type === SummaryType.FINISHED
	// 	);
	// 	const filteredEvents = this.filteredEvents().filter(
	// 		(event) => event.meta.type !== SummaryType.FINISHED
	// 	);
	// 	value
	// 		? this.filteredEvents.set([...this.filteredEvents(), ...finishedEvents])
	// 		: this.filteredEvents.set(filteredEvents);
	// }

	// public toggleCancelled(value: boolean) {
	// 	this.cancelledControl.setValue(value);

	// 	const cancelledEvents = this.originalEvents().filter(
	// 		(event) => event.meta.type === SummaryType.CANCELLED
	// 	);
	// 	const filteredEvents = this.filteredEvents().filter(
	// 		(event) => event.meta.type !== SummaryType.CANCELLED
	// 	);
	// 	value
	// 		? this.filteredEvents.set([...this.filteredEvents(), ...cancelledEvents])
	// 		: this.filteredEvents.set(filteredEvents);
	// }

	// public toggleNext(value: boolean) {
	// 	this.nextControl.setValue(value);

	// 	const nextEvents = this.originalEvents().filter(
	// 		(event) => event.meta.type === SummaryType.PENDING
	// 	);
	// 	const filteredEvents = this.filteredEvents().filter(
	// 		(event) => event.meta.type !== SummaryType.PENDING
	// 	);
	// 	value
	// 		? this.filteredEvents.set([...this.filteredEvents(), ...nextEvents])
	// 		: this.filteredEvents.set(filteredEvents);
	// }

	public showEvent(meta: EventMeta) {
		this._dialogService.open(SummaryModalComponent, {
			context: { detail: meta.detail, id: meta.detail.citaid, origin: OriginSummary.CALENDAR }
		});
	}

	public dayClicked(selectedDate: Date) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) return;

		const formattedDate = this._datePipe.transform(selectedDate, 'MM-dd-yyyy');
		this._router.navigate(['/pages/appointments', 'new'], {
			queryParams: { date: formattedDate }
		});
	}
}
