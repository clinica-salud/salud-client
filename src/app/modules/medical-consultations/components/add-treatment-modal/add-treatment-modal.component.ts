import { Component, Input, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
	NbButtonModule,
	NbCardModule,
	NbDialogRef,
	NbIconModule,
	NbInputModule,
	NbOptionModule,
	NbSelectModule
} from '@nebular/theme';

import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { ConsultationService, OdontogramService } from '@src/app/shared/services';

const NB_MODULES = [
	NbButtonModule,
	NbCardModule,
	NbIconModule,
	NbInputModule,
	NbOptionModule,
	NbSelectModule
];
const DIRECTIVES = [WindowDirective];

@Component({
	selector: 'app-add-treatment-modal',
	standalone: true,
	imports: [ReactiveFormsModule, ...NB_MODULES, ...DIRECTIVES],
	templateUrl: './add-treatment-modal.component.html',
	styleUrl: './add-treatment-modal.component.scss'
})
export class AddTreatmentModalComponent implements OnInit {
	private _fb = inject(FormBuilder);
	private _dialogRef = inject(NbDialogRef<AddTreatmentModalComponent>);
	private _odontogramService = inject(OdontogramService);
	private _consultationService = inject(ConsultationService);

	@Input() consultaid!: number;
	@Input() selectedTooth?: ITooth;

	public teeth = toSignal(this._odontogramService.getMinimalTeethPieces());
	public treatments = toSignal(this._odontogramService.getTreatments());
	public faces = toSignal(this._odontogramService.getFaces());

	public form: FormGroup = this._fb.group({
		piezaid: ['', [Validators.required]],
		tipotratamientoid: ['', [Validators.required]],
		tipocaraid: ['', [Validators.required]],
		detalle: ['', [Validators.required]]
	});

	ngOnInit(): void {
		if (this.selectedTooth) {
			this.form.patchValue({
				piezaid: this.selectedTooth.piezaid
			});
		}
	}

	public addTreatment() {
		const data = {
			...this.form.value,
			es_tratamiento: false,
			observacion: '~',
			imagen: '~'
		};

		this._consultationService
			.addOdontogramConsultation(this.consultaid, data)
			.subscribe(() => this._dialogRef.close({ cancel: false }));
	}

	public close() {
		this._dialogRef.close({ cancel: true });
	}
}
