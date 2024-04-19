import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TeethType } from '@src/app/shared/enums/odontogram.enum';
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

	@Output() public selectedTooth: EventEmitter<string> = new EventEmitter<string>();
	@Input() teethType: TeethType = TeethType.ADULT;

	public topA: ITooth[] = [];
	public topB: ITooth[] = [];
	public topC: ITooth[] = [];
	public bottomA: ITooth[] = [];
	public bottomB: ITooth[] = [];
	public bottomC: ITooth[] = [];

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

		this.topA = dataA.slice(0, dataA.length / 2);
		this.topB = dataB.slice(0, dataB.length / 2);
		this.topC = dataC.slice(0, dataC.length / 2);
		this.bottomA = dataA.slice(dataA.length / 2);
		this.bottomB = dataB.slice(dataB.length / 2);
		this.bottomC = dataC.slice(dataC.length / 2);
	}

	public selected(tooth: ITooth) {
		console.log(tooth);
		// this.selectedTooth.next(id);
	}
}
