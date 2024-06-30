import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
	NbButtonModule,
	NbCardModule,
	NbDialogRef,
	NbIconModule,
	NbOptionModule,
	NbSelectModule
} from '@nebular/theme';
import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';
import { AppointmentService } from '@src/app/shared/services';

const NB_MODULES = [NbCardModule, NbIconModule, NbButtonModule, NbSelectModule, NbOptionModule];
const DIRECTIVES = [WindowDirective];

@Component({
	selector: 'app-change-status-modal',
	standalone: true,
	imports: [ReactiveFormsModule, ...NB_MODULES, ...DIRECTIVES],
	templateUrl: './change-status-modal.component.html'
})
export class ChangeStatusModalComponent implements OnInit {
	private _appointmentService = inject(AppointmentService);
	private _dialogRef = inject(NbDialogRef<ChangeStatusModalComponent>);
	private _fb = inject(FormBuilder);
	private _destroyRef = inject(DestroyRef);

	@Input() statuses: any[] = [];
	@Input() citaid!: number;
	@Input() estadoid!: number;

	public form = this._fb.group({
		estadoid: [0, [Validators.required]]
	});

	ngOnInit(): void {
		if (this.estadoid) {
			this.form.patchValue({ estadoid: this.estadoid });
		}
	}

	public updateStatus() {
		const { estadoid } = this.form.value;
		this._appointmentService
			.updateStatusAppointment(this.citaid, { estadoid: estadoid || '' })
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this._dialogRef.close({ cancel: false }));
	}

	public close() {
		this._dialogRef.close({ cancel: true });
	}
}
