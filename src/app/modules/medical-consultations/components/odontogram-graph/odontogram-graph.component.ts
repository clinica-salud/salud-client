import { NgStyle } from '@angular/common';
import {
	Component,
	EventEmitter,
	Input,
	Output,
	computed,
	effect,
	inject,
	signal,
} from '@angular/core';
import { ITooth } from '@src/app/shared/models/odontogram.model';
import { OdontogramService } from '@src/app/shared/services';

@Component({
	selector: 'app-odontogram-graph',
	standalone: true,
	imports: [NgStyle],
	templateUrl: './odontogram-graph.component.html',
	styleUrl: './odontogram-graph.component.scss',
})
export class OdontogramGraphComponent {
	private _odontogramService = inject(OdontogramService);
	public piezas = signal([]);

	@Input() set odontogramConsultations(piezas: any) {
		if (piezas) {
			this.piezas.set(piezas);
			this.addColor(this.piezas());
		}
	}
	@Output() public selectedTooth: EventEmitter<ITooth> = new EventEmitter<ITooth>();

	public topA: ITooth[] = [];
	public topB: ITooth[] = [];
	public topC: ITooth[] = [];
	public bottomA: ITooth[] = [];
	public bottomB: ITooth[] = [];
	public bottomC: ITooth[] = [];

	public teethType = computed(() => this._odontogramService.teethType());
	public teeth = computed(() => this._odontogramService.teeth());

	constructor() {
		effect(() => {
			this.orderTeeth(this.teeth());
			this.addColor(this.piezas());
		});
	}

	private addColor(piezas: any[]) {
		if (piezas.length === 0) return;

		const piezasMap = new Map(piezas.map((pieza) => [pieza.piezaid, pieza]));

		const formattedData = this.teeth().map((tooth) => {
			const pieza = piezasMap.get(tooth.piezaid);

			return {
				...tooth,
				color:
					pieza && (pieza.faseodontogramaid === 1 || pieza.faseodontogramaid === 2)
						? '#bbdabb'
						: '#fff',
			};
		});

		this.orderTeeth(formattedData);
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
