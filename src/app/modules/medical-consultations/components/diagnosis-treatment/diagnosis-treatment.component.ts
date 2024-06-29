import {
	Component,
	DestroyRef,
	OnChanges,
	SimpleChanges,
	inject,
	input,
	signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NbButtonModule, NbCardModule, NbDialogService, NbIconModule } from '@nebular/theme';
import { AddRecipeModalComponent } from '@src/app/modules/medical-consultations/components/add-recipe-modal/add-recipe-modal.component';

import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';
import { IRecipe } from '@src/app/shared/models';
import { ConsultationService, RecipeService } from '@src/app/shared/services';

const COMPONENTS = [DetailTabComponent, NbCardModule, NbIconModule, NbButtonModule];

@Component({
	selector: 'app-diagnosis-treatment',
	standalone: true,
	imports: [...COMPONENTS],
	templateUrl: './diagnosis-treatment.component.html'
})
export class DiagnosisTreatmentComponent implements OnChanges {
	private _dialogService = inject(NbDialogService);
	private _recipeService = inject(RecipeService);
	private _destroyRef = inject(DestroyRef);
	private _consultationService = inject(ConsultationService);

	treatments = input.required<any[]>();
	diagnosis = input.required<any[]>();
	consulta = input.required<any>();

	public recipes = signal<IRecipe[]>([]);

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['consulta'] && this.consulta().citaid) this.getRecipes();
	}

	private getRecipes() {
		this._recipeService
			.getRecipes(this.consulta().citaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((recipes) => this.recipes.set(recipes));
	}

	public downloadPDF() {
		this._consultationService
			.generatePDF(this.consulta().consultaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `Historia_Clinica_${this.consulta().consultaid}.pdf`;
				document.body.appendChild(a);
				a.click();
				a.remove();
				window.URL.revokeObjectURL(url);
			});
	}

	public addRecipe() {
		const dialog = this._dialogService.open(AddRecipeModalComponent, {
			context: { citaid: this.consulta().citaid }
		});
		dialog.onClose.subscribe(({ cancel }) => {
			if (!cancel) this.getRecipes();
		});
	}

	public deleteRecipe(recetaid: number) {
		if (!confirm('¿Deseas borrar esta receta?')) return;

		this._recipeService
			.deleteRecipe(recetaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.getRecipes());
	}
}
