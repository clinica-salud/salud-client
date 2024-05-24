import { Component, inject } from '@angular/core';
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
	selector: 'app-add-recipe-modal',
	standalone: true,
	imports: [ReactiveFormsModule, ...NB_MODULES, ...DIRECTIVES],
	templateUrl: './add-recipe-modal.component.html',
	styleUrl: './add-recipe-modal.component.scss'
})
export class AddRecipeModalComponent {
	private _fb = inject(FormBuilder);
	private _dialogRef = inject(NbDialogRef<AddRecipeModalComponent>);

	public form: FormGroup = this._fb.group({
		medicine: ['', [Validators.required]],
		route: ['', [Validators.required]],
		dose: ['', [Validators.required]],
		frequency: ['', [Validators.required]],
		time: ['', [Validators.required]],
		quantity: ['', [Validators.required]],
		indications: ['', [Validators.required]]
	});

	public addRecipe() {
		console.log(this.form.value);
	}

	public close() {
		this._dialogRef.close();
	}
}
