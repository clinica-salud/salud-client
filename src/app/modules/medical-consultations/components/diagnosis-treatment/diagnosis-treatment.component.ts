import { NgStyle } from '@angular/common';
import {
	Component,
	DestroyRef,
	OnChanges,
	SimpleChanges,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	NbButtonModule,
	NbCardModule,
	NbDialogService,
	NbIconModule,
	NbTooltipModule,
} from '@nebular/theme';
import { AddRecipeModalComponent } from '@src/app/modules/medical-consultations/components/add-recipe-modal/add-recipe-modal.component';

import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';
import { IRecipe } from '@src/app/shared/models';
import { ConsultationService, RecipeService } from '@src/app/shared/services';

const COMPONENTS = [DetailTabComponent, NbCardModule, NbIconModule, NbButtonModule];

const NB_MODULES = [NbTooltipModule];

@Component({
	selector: 'app-diagnosis-treatment',
	standalone: true,
	imports: [NgStyle, ...COMPONENTS, ...NB_MODULES],
	templateUrl: './diagnosis-treatment.component.html',
})
export class DiagnosisTreatmentComponent implements OnChanges {
	private _dialogService = inject(NbDialogService);
	private _recipeService = inject(RecipeService);
	private _destroyRef = inject(DestroyRef);
	private _consultationService = inject(ConsultationService);

	public treatments = input.required<any[]>();
	public diagnosis = input.required<any[]>();
	public consulta = input.required<any>();
	public consultaid = input.required<number>();

	public refreshConsultations = output();

	public recipes = signal<IRecipe[]>([]);

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['consulta'] && this.consulta().citaid) this.getRecipes();
	}

	private onRefreshConsultations() {
		this.refreshConsultations.emit();
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

	public patchTreatmentStatus(item: any) {
		const { piezaid, es_tratamiento, faseodontogramaid } = item;
		this._consultationService
			.patchOdontogramConsultation(this.consultaid(), piezaid, {
				es_tratamiento,
				faseodontogramaid: faseodontogramaid === 2 ? 1 : 2,
			})
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.onRefreshConsultations());
	}

	public addRecipe() {
		const dialog = this._dialogService.open(AddRecipeModalComponent, {
			context: { citaid: this.consulta().citaid },
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
