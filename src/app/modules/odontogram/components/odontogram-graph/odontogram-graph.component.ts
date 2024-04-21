import { Component, EventEmitter, Output, effect, inject } from '@angular/core';
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

	public topA: ITooth[] = [];
	public topB: ITooth[] = [];
	public topC: ITooth[] = [];
	public bottomA: ITooth[] = [];
	public bottomB: ITooth[] = [];
	public bottomC: ITooth[] = [];

	get teethType() {
		return this._odontogramService.teethType;
	}

	get teeth() {
		return this._odontogramService.teeth;
	}

	constructor() {
		this._odontogramService.getTeethPieces();
		effect(() => this.orderTeeth(this.teeth));
	}

	private orderTeeth(teeth: ITooth[]) {
		const dataA = teeth.filter((d) => d.fila === 'A');
		const dataB = teeth.filter((d) => d.fila === 'B');
		const dataC = teeth.filter((d) => d.fila === 'C');

		this.topA = dataA.slice(0, dataA.length / 2);
		this.topB = dataB.slice(0, dataB.length / 2);
		this.topC = dataC.slice(0, dataC.length / 2);
		this.bottomA = dataA.slice(dataA.length / 2);
		this.bottomB = dataB.slice(dataB.length / 2);
		this.bottomC = dataC.slice(dataC.length / 2);
	}

	public selected(tooth: ITooth) {
		this.selectedTooth.next(tooth);
	}
}
