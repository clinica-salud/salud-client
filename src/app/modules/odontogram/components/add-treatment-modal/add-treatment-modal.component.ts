import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
	NbButtonModule,
	NbCardModule,
	NbDialogRef,
	NbIconModule,
	NbOptionModule,
	NbSelectModule
} from '@nebular/theme';

import { WindowDirective } from '@src/app/shared/helpers/window/window.directive';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { OdontogramService } from '@src/app/shared/services';

const NB_MODULES = [NbCardModule, NbIconModule, NbButtonModule, NbSelectModule, NbOptionModule];
const DIRECTIVES = [WindowDirective];

@Component({
	selector: 'app-add-treatment-modal',
	standalone: true,
	imports: [AsyncPipe, ReactiveFormsModule, ...NB_MODULES, ...DIRECTIVES],
	templateUrl: './add-treatment-modal.component.html',
	styleUrl: './add-treatment-modal.component.scss'
})
export class AddTreatmentModalComponent implements OnInit {
	private _fb = inject(FormBuilder);
	private _dialogRef = inject(NbDialogRef<AddTreatmentModalComponent>);
	private _odontogramService = inject(OdontogramService);

	@Input() selectedTooth?: ITooth;

	public teeth$ = this._odontogramService.getMinimalTeethPieces();
	public treatments$ = this._odontogramService.getTreatments();
	public faces$ = this._odontogramService.getFaces();

	public form: FormGroup = this._fb.group({
		piezaid: ['', [Validators.required]],
		tipotratamientoid: ['', [Validators.required]],
		tipocaraid: ['', [Validators.required]]
	});

	ngOnInit(): void {
		if (this.selectedTooth) {
			this.form.patchValue({
				piezaid: this.selectedTooth.piezaid
			});
		}
	}

	public addTreatment() {
		console.log(this.form.value);
	}

	public close() {
		this._dialogRef.close();
	}
}
