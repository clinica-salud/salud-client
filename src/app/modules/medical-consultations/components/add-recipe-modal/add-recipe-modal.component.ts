import { Component, DestroyRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import { RecipeService } from '@src/app/shared/services';

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
	templateUrl: './add-recipe-modal.component.html'
})
export class AddRecipeModalComponent {
	private _fb = inject(FormBuilder);
	private _dialogRef = inject(NbDialogRef<AddRecipeModalComponent>);
	private _recipeService = inject(RecipeService);
	private _destroyRef = inject(DestroyRef);

	citaid = input.required<number>();

	public form: FormGroup = this._fb.group({
		medicamento: ['', [Validators.required]],
		via_administrativa: ['', [Validators.required]],
		dosis: ['', [Validators.required]],
		frecuencia: ['', [Validators.required]],
		tiempo: ['', [Validators.required]],
		cantidad: ['', [Validators.required]],
		indicaciones: ['', [Validators.required]]
	});

	public addRecipe() {
		const data = { ...this.form.value, citaid: this.citaid };

		this._recipeService
			.addRecipe(data)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this._dialogRef.close({ cancel: false }));
	}

	public close() {
		this._dialogRef.close({ cancel: true });
	}
}
