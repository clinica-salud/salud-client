import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';

import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { addDays, startOfDay } from 'date-fns';

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

	public today: Date = new Date();

	public filteredEvents: CalendarEvent[] = [];

	public originalEvents: CalendarEvent[] = [
		{
			start: startOfDay(new Date()),
			title: 'Cita finalizada',
			color: { ...COLORS.finished },
			meta: {
				type: SummaryType.FINISHED,
				detail: 'some data'
			}
		},
		{
			start: startOfDay(new Date()),
			title: 'Cita cancelada',
			color: { ...COLORS.cancelled },
			meta: {
				type: SummaryType.CANCELLED,
				detail: 'some data'
			}
		},
		{
			start: startOfDay(addDays(new Date(), -1)),
			title: 'Cita cancelada',
			color: { ...COLORS.cancelled },
			meta: {
				type: SummaryType.CANCELLED,
				detail: 'some data'
			}
		},
		{
			start: startOfDay(addDays(new Date(), 1)),
			title: 'Cita próxima',
			color: { ...COLORS.next },
			meta: {
				type: SummaryType.NEXT,
				detail: 'some data'
			}
		},
		{
			start: startOfDay(addDays(new Date(), 3)),
			title: 'Cita próxima',
			color: { ...COLORS.next },
			meta: {
				type: SummaryType.NEXT,
				detail: 'some data'
			}
		},
		{
			start: startOfDay(addDays(new Date(), 8)),
			title: 'Cita cancelada',
			color: { ...COLORS.cancelled },
			meta: {
				type: SummaryType.CANCELLED,
				detail: 'some data'
			}
		},
		{
			start: startOfDay(addDays(new Date(), 10)),
			title: 'Cita finalizada',
			color: { ...COLORS.finished },
			meta: {
				type: SummaryType.FINISHED,
				detail: 'some data'
			}
		}
	];

	public allControl = this._fb.control(true, { nonNullable: true });
	public finishedControl = this._fb.control(false, { nonNullable: true });
	public cancelledControl = this._fb.control(false, { nonNullable: true });
	public nextControl = this._fb.control(false, { nonNullable: true });

	constructor() {
		this.onToggleAll(this.allControl.value);

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

	public onToggleAll(value: boolean) {
		this.finishedControl.setValue(value);
		this.cancelledControl.setValue(value);
		this.nextControl.setValue(value);

		value ? (this.filteredEvents = this.originalEvents) : (this.filteredEvents = []);
	}

	public onToggleFinished(value: boolean) {
		this.finishedControl.setValue(value);

		const finishedEvents = this.originalEvents.filter((event) => event.meta.type === SummaryType.FINISHED);
		value
			? (this.filteredEvents = [...this.filteredEvents, ...finishedEvents])
			: (this.filteredEvents = this.filteredEvents.filter((event) => event.meta.type !== SummaryType.FINISHED));
	}

	public onToggleCancelled(value: boolean) {
		this.cancelledControl.setValue(value);

		const cancelledEvents = this.originalEvents.filter((event) => event.meta.type === SummaryType.CANCELLED);
		value
			? (this.filteredEvents = [...this.filteredEvents, ...cancelledEvents])
			: (this.filteredEvents = this.filteredEvents.filter((event) => event.meta.type !== SummaryType.CANCELLED));
	}

	public onToggleNext(value: boolean) {
		this.nextControl.setValue(value);

		const nextEvents = this.originalEvents.filter((event) => event.meta.type === SummaryType.NEXT);
		value
			? (this.filteredEvents = [...this.filteredEvents, ...nextEvents])
			: (this.filteredEvents = this.filteredEvents.filter((event) => event.meta.type !== SummaryType.NEXT));
	}

	public showEvent(meta: EventMeta): void {
		this._dialogService.open(SummaryModalComponent, {
			context: {
				summaryType: meta.type
			}
		});
		console.log(meta);
	}
}
