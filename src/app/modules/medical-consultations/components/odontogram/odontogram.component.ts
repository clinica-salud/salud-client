import { Component, DestroyRef, ElementRef, computed, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {
	NbButtonModule,
	NbCardModule,
	NbCheckboxModule,
	NbDialogService,
	NbIconModule
} from '@nebular/theme';

import { AddTreatmentModalComponent } from '@src/app/modules/medical-consultations/components/add-treatment-modal/add-treatment-modal.component';
import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';
import { OdontogramGraphComponent } from '@src/app/modules/medical-consultations/components/odontogram-graph/odontogram-graph.component';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { ConsultationService, OdontogramService } from '@src/app/shared/services';

const NB_MODULES = [NbButtonModule, NbIconModule, NbCardModule, NbCheckboxModule];
const COMPONENTS = [OdontogramGraphComponent, DetailTabComponent];

@Component({
	selector: 'app-odontogram',
	standalone: true,
	imports: [...COMPONENTS, ...NB_MODULES],
	templateUrl: './odontogram.component.html',
	styleUrl: './odontogram.component.scss'
})
export class OdontogramComponent {
	private _dialogService = inject(NbDialogService);
	private _odontogramService = inject(OdontogramService);
	private _consultationService = inject(ConsultationService);
	private _destroyRef = inject(DestroyRef);
	private _elementRef = inject(ElementRef);

	consultaid = input.required<number>();
	odontogramConsultations = input.required<any>();

	refreshConsultations = output();

	public teethType = computed(() => this._odontogramService.teethType());
	public teeth = computed(() => this._odontogramService.teeth());

	constructor() {
		this._odontogramService.getTeethPieces();
	}

	private onRefreshConsultations() {
		this.refreshConsultations.emit();
	}

	public toggleTeethType() {
		this._odontogramService.setTeethType(this.teethType() === 1 ? 2 : 1);
	}

	public patchTreatment(e: any, item: any) {
		const { piezaid } = item;
		this._consultationService
			.patchOdontogramConsultation(this.consultaid(), piezaid, {
				es_tratamiento: e
			})
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.onRefreshConsultations());
	}

	public deleteOdontogramConsultation(item: any) {
		if (!confirm('¿Esta seguro de eliminar este elemento?')) return;

		this._consultationService
			.deleteOdontogramConsultation(this.consultaid(), item.piezaid)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe(() => this.onRefreshConsultations());
	}

	public addTreatment(tooth?: ITooth) {
		const dialog = this._dialogService.open(AddTreatmentModalComponent, {
			context: {
				selectedTooth: tooth,
				consultaid: this.consultaid()
			}
		});
		dialog.onClose.subscribe(({ cancel }) => {
			if (cancel) return;
			this.onRefreshConsultations();
		});
	}

	public generatePDF() {
		const div = this._elementRef.nativeElement.querySelector('#odontogram');

		const options = {
			useCORS: true,
			logging: true,
			allowTaint: true
		};

		html2canvas(div, options)
			.then((canvas) => {
				const img = canvas.toDataURL('image/jpeg');
				const doc = new jsPDF('p', 'mm', 'a4', true);
				const bufferX = 5;
				const bufferY = 5;
				const imgProps = (<any>doc).getImageProperties(img);
				const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
				const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
				doc.addImage(img, 'jpeg', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
				doc.save('odontograma.pdf');
			})
			.catch((error) => {
				console.error('Error generating PDF:', error);
			});
	}
}
