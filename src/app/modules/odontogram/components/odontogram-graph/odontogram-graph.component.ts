import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { OdontogramService } from '@src/app/shared/services';

@Component({
	selector: 'app-odontogram-graph',
	standalone: true,
	imports: [],
	templateUrl: './odontogram-graph.component.html',
	styleUrl: './odontogram-graph.component.scss'
})
export class OdontogramGraphComponent {
	private _odontogramService = inject(OdontogramService);

	@Output() public selectedTooth: EventEmitter<ITooth> = new EventEmitter<ITooth>();

	public topA = signal<ITooth[]>([]);
	public topB = signal<ITooth[]>([]);
	public topC = signal<ITooth[]>([]);
	public bottomA = signal<ITooth[]>([]);
	public bottomB = signal<ITooth[]>([]);
	public bottomC = signal<ITooth[]>([]);

	get teethType() {
		return this._odontogramService.teethType;
	}

	constructor() {
		this.getTeethPieces();
	}

	private getTeethPieces() {
		this._odontogramService.getTeethPieces(this.teethType).subscribe((response) => this.orderTeethData(response));
	}

	private orderTeethData(teethData: ITooth[]) {
		const dataA = teethData.filter((d) => d.fila === 'A');
		const dataB = teethData.filter((d) => d.fila === 'B');
		const dataC = teethData.filter((d) => d.fila === 'C');

		this.topA.set(dataA.slice(0, dataA.length / 2));
		this.topB.set(dataB.slice(0, dataB.length / 2));
		this.topC.set(dataC.slice(0, dataC.length / 2));
		this.bottomA.set(dataA.slice(dataA.length / 2));
		this.bottomB.set(dataB.slice(dataB.length / 2));
		this.bottomC.set(dataC.slice(dataC.length / 2));
	}

	public selected(tooth: ITooth) {
		this.selectedTooth.next(tooth);
	}
}
