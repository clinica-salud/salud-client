import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';

import { CalendarEvent, CalendarModule } from 'angular-calendar';
import { addDays, startOfDay } from 'date-fns';

import { Router } from '@angular/router';
import {
	SummaryModalComponent,
	SummaryType
} from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';
import { SmallToggleComponent } from '@src/app/shared/components/small-toggle/small-toggle.component';

const NB_MODULES = [NbCardModule, NbButtonModule, NbIconModule];
const COMPONENTS = [SmallToggleComponent];
const OTHER_MODULES = [CalendarModule];

const COLORS = {
	finished: {
		primary: 'var(--color-success-500)',
		secondary: 'var(--color-success-100)'
	},
	cancelled: {
		primary: 'var(--color-danger-500)',
		secondary: 'var(--color-danger-100)'
	},
	next: {
		primary: 'var(--color-warning-500)',
		secondary: 'var(--color-warning-100)'
	}
};

const EVENTS = [
	{
		start: startOfDay(new Date()),
		// title: 'Cita finalizada',
		title: '',
		color: { ...COLORS.finished },
		meta: {
			type: SummaryType.FINISHED,
			detail: 'some data'
		}
	},
	{
		start: startOfDay(new Date()),
		// title: 'Cita cancelada',
		title: '',
		color: { ...COLORS.cancelled },
		meta: {
			type: SummaryType.CANCELLED,
			detail: 'some data'
		}
	},
	{
		start: startOfDay(addDays(new Date(), -1)),
		// title: 'Cita cancelada',
		title: '',
		color: { ...COLORS.cancelled },
		meta: {
			type: SummaryType.CANCELLED,
			detail: 'some data'
		}
	},
	{
		start: startOfDay(addDays(new Date(), 1)),
		// title: 'Cita próxima',
		title: '',
		color: { ...COLORS.next },
		meta: {
			type: SummaryType.NEXT,
			detail: 'some data'
		}
	},
	{
		start: startOfDay(addDays(new Date(), 3)),
		// title: 'Cita próxima',
		title: '',
		color: { ...COLORS.next },
		meta: {
			type: SummaryType.NEXT,
			detail: 'some data'
		}
	},
	{
		start: startOfDay(addDays(new Date(), 8)),
		// title: 'Cita cancelada',
		title: '',
		color: { ...COLORS.cancelled },
		meta: {
			type: SummaryType.CANCELLED,
			detail: 'some data'
		}
	},
	{
		start: startOfDay(addDays(new Date(), 10)),
		// title: 'Cita finalizada',
		title: '',
		color: { ...COLORS.finished },
		meta: {
			type: SummaryType.FINISHED,
			detail: 'some data'
		}
	}
];

type EventMeta = {
	type: SummaryType;
	detail: string;
};

@Component({
	selector: 'app-calendar',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, ...NB_MODULES, ...OTHER_MODULES, ...COMPONENTS],
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
	private _dialogService = inject(NbDialogService);
	private _fb = inject(FormBuilder);
	private _router = inject(Router);
	private _datePipe = inject(DatePipe);

	public today = signal(new Date());
	public originalEvents = signal<CalendarEvent[]>(EVENTS);
	public filteredEvents = signal<CalendarEvent[]>([]);

	public form = this._fb.group({
		all: [true],
		finished: [false],
		cancelled: [false],
		next: [false]
	});

	get allControl() {
		return this.form.controls['all'];
	}
	get finishedControl() {
		return this.form.controls['finished'];
	}
	get cancelledControl() {
		return this.form.controls['cancelled'];
	}
	get nextControl() {
		return this.form.controls['next'];
	}

	constructor() {
		this.toggleAll(this.allControl.value!);

		this.finishedControl.valueChanges.subscribe(() => this.updateAllControl());
		this.cancelledControl.valueChanges.subscribe(() => this.updateAllControl());
		this.nextControl.valueChanges.subscribe(() => this.updateAllControl());
	}

	private updateAllControl() {
		const finishedValue = this.finishedControl.value;
		const cancelledValue = this.cancelledControl.value;
		const nextValue = this.nextControl.value;

		const allValuesAreSet = finishedValue && cancelledValue && nextValue;

		if (allValuesAreSet) {
			this.allControl.patchValue(true);
			return;
		}

		this.allControl.patchValue(false);
	}

	public toggleAll(value: boolean) {
		this.finishedControl.setValue(value);
		this.cancelledControl.setValue(value);
		this.nextControl.setValue(value);

		value ? this.filteredEvents.set(this.originalEvents()) : this.filteredEvents.set([]);
	}

	public toggleFinished(value: boolean) {
		this.finishedControl.setValue(value);

		const finishedEvents = this.originalEvents().filter((event) => event.meta.type === SummaryType.FINISHED);
		const filteredEvents = this.filteredEvents().filter((event) => event.meta.type !== SummaryType.FINISHED);
		value
			? this.filteredEvents.set([...this.filteredEvents(), ...finishedEvents])
			: this.filteredEvents.set(filteredEvents);
	}

	public toggleCancelled(value: boolean) {
		this.cancelledControl.setValue(value);

		const cancelledEvents = this.originalEvents().filter((event) => event.meta.type === SummaryType.CANCELLED);
		const filteredEvents = this.filteredEvents().filter((event) => event.meta.type !== SummaryType.CANCELLED);
		value
			? this.filteredEvents.set([...this.filteredEvents(), ...cancelledEvents])
			: this.filteredEvents.set(filteredEvents);
	}

	public toggleNext(value: boolean) {
		this.nextControl.setValue(value);

		const nextEvents = this.originalEvents().filter((event) => event.meta.type === SummaryType.NEXT);
		const filteredEvents = this.filteredEvents().filter((event) => event.meta.type !== SummaryType.NEXT);
		value
			? this.filteredEvents.set([...this.filteredEvents(), ...nextEvents])
			: this.filteredEvents.set(filteredEvents);
	}

	public showEvent(meta: EventMeta) {
		this._dialogService.open(SummaryModalComponent, {
			context: {
				summaryType: meta.type,
				detail: meta.detail
			}
		});
		console.log(meta);
	}

	public dayClicked(selectedDate: Date) {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (selectedDate < today) return;

		const formattedDate = this._datePipe.transform(selectedDate, 'MM-dd-yyyy');
		this._router.navigate(['/pages/appointments', 'new-appointment'], { queryParams: { date: formattedDate } });
	}
}
