import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
	NgxTimelineEvent,
	NgxTimelineEventChangeSide,
	NgxTimelineEventGroup,
	NgxTimelineModule,
} from '@frxjs/ngx-timeline';
import {
	NbBadgeModule,
	NbCardModule,
	NbDatepickerModule,
	NbIconModule,
	NbInputModule,
	NbOptionModule,
	NbProgressBarModule,
	NbSelectModule,
} from '@nebular/theme';
import { ReportService } from '@src/app/shared/services';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';

const NB_MODULES = [
	NbCardModule,
	NbIconModule,
	NbSelectModule,
	NbOptionModule,
	NbProgressBarModule,
	NbBadgeModule,
	NbDatepickerModule,
	NbInputModule,
];
const OTHER_MODULES = [NgxTimelineModule, NgxEchartsDirective];

type Data = {
	paciente: string;
	descripcion: string;
	doctor: string;
	edificio: string;
	estado: string;
};
type NgxTimelineEventWithData = NgxTimelineEvent & { data: Data };

type Month = {
	id: number;
	label: string;
};

const MONTHS = [
	{ id: 1, label: 'Enero' },
	{ id: 2, label: 'Febrero' },
	{ id: 3, label: 'Marzo' },
	{ id: 4, label: 'Abril' },
	{ id: 5, label: 'Mayo' },
	{ id: 6, label: 'Junio' },
	{ id: 7, label: 'Julio' },
	{ id: 8, label: 'Agosto' },
	{ id: 9, label: 'Septiembre' },
	{ id: 10, label: 'Octubre' },
	{ id: 11, label: 'Noviembre' },
	{ id: 12, label: 'Diciembre' },
];

@Component({
	standalone: true,
	imports: [DatePipe, DecimalPipe, ReactiveFormsModule, NgClass, ...NB_MODULES, ...OTHER_MODULES],
	templateUrl: './main.component.html',
	styleUrl: './main.component.scss',
	providers: [provideEcharts()],
})
export class MainComponent {
	private _reportService = inject(ReportService);
	private _fb = inject(FormBuilder);
	private _destroyRef = inject(DestroyRef);
	private _datePipe = inject(DatePipe);

	public years = signal<number[]>([
		...Array.from({ length: new Date().getFullYear() - 2023 + 1 }, (_, i) => 2023 + i),
	]);
	public months = signal<Month[]>(MONTHS);

	public form: FormGroup = this._fb.group({
		year: [new Date().getFullYear()],
		month: [new Date().getMonth() + 1],
	});

	public treatmentYear: FormControl = this._fb.control(new Date().getFullYear());
	public activityDay: FormControl = this._fb.control(new Date());

	public eventType: NgxTimelineEventGroup = NgxTimelineEventGroup.DAY_MONTH_YEAR;
	public eventChangeSide: NgxTimelineEventChangeSide = NgxTimelineEventChangeSide.ALL_IN_GROUP;

	public treatmentChart = signal<EChartsOption>({
		tooltip: {
			trigger: 'axis',
		},
		legend: {
			data: [],
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		},
		yAxis: {
			type: 'value',
		},
		grid: {
			left: '2%',
			right: '2%',
			bottom: '10%',
		},
		series: [],
	});

	public patientChart = signal<EChartsOption>({
		tooltip: {
			trigger: 'item',
		},
		legend: {
			top: '5%',
			left: 'center',
		},
		series: [],
	});

	public reports = signal<any>({});
	public pacienteSexo = signal<any[]>([]);
	public events = signal<NgxTimelineEventWithData[]>([]);
	public treatmentReports = signal<any[]>([]);

	constructor() {
		this.getReports();
		this.getTreatmentReports();
		this.getDailyActivity();

		this.form.valueChanges.subscribe((val) => {
			if (val.year && val.month) this.getReports();
		});

		this.treatmentYear.valueChanges.subscribe((val) => {
			if (val) this.getTreatmentReports();
		});

		this.activityDay.valueChanges.subscribe((val) => {
			if (val) this.getDailyActivity();
		});
	}

	private getReports() {
		const { year, month } = this.form.value;
		this._reportService
			.getReports({ year, month })
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((data) => {
				this.reports.set(data);

				const countByGender = data.pacientesSexo.reduce(
					(acc: any, obj: any) => {
						if (obj.sexo === 'M') {
							acc.Varones += 1;
						} else if (obj.sexo === 'F') {
							acc.Mujeres += 1;
						}
						return acc;
					},
					{ Varones: 0, Mujeres: 0 }
				);

				this.pacienteSexo.set([
					{ name: 'Varones', value: countByGender.Varones },
					{ name: 'Mujeres', value: countByGender.Mujeres },
				]);

				this.patientChart.update((curr) => ({
					...curr,
					series: [
						{
							name: 'Pacientes',
							type: 'pie',
							radius: ['40%', '70%'],
							avoidLabelOverlap: false,
							label: {
								show: false,
								position: 'center',
							},
							emphasis: {
								label: {
									show: true,
									fontSize: 24,
									fontWeight: 'bold',
								},
							},
							labelLine: {
								show: false,
							},
							data: this.pacienteSexo(),
						},
					],
				}));
			});
	}

	public getTreatmentReports() {
		this._reportService
			.getReportTreatmentsByYear(this.treatmentYear.value)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((data) => {
				const months = Array.from({ length: 12 }, (_, i) => i + 1);
				const colors = ['#3056d2', '#13c296', '#ff9800', '#f6c23e', '#e74a3b', '#4e73df'];

				const filteredData = data.filter((item: any) => item.tipo_tratamiento !== '-');

				const groupedData = filteredData.reduce((acc: any, item: any, index: number) => {
					const { tipotratamientoid, tipo_tratamiento, month, total_tratamientos } = item;
					let group = acc.find((g: any) => g.tipotratamientoid === tipotratamientoid);

					if (!group) {
						group = {
							tipotratamientoid,
							name: tipo_tratamiento,
							type: 'line',
							smooth: true,
							lineStyle: {
								width: 5,
								color: colors[index % colors.length] || '#000',
							},
							data: months.map((m) => ({ month: m, total_tratamientos: 0 })),
						};
						acc.push(group);
					}

					group.data[month - 1].total_tratamientos = total_tratamientos;

					return acc;
				}, []);

				const legends = groupedData.map((group: any) => group.name);
				const result = groupedData.map((group: any) => ({
					...group,
					data: months.map(
						(month) => group.data.find((d: any) => d.month === month).total_tratamientos
					),
				}));

				this.treatmentChart.update((curr) => ({
					...curr,
					legend: {
						...curr.legend,
						data: legends,
					},
					series: result,
				}));
			});
	}

	public getDailyActivity() {
		const parsedDate = this._datePipe.transform(this.activityDay.value, 'yyyy-MM-dd');

		this._reportService
			.getDailyActivity({ date: parsedDate })
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe((data) => {
				this.events.set(
					data.map((item: any) => {
						return {
							id: item.citaid,
							timestamp: new Date(item.fecha + ' ' + item.hora),
							data: {
								paciente: `${item.paciente_nombre} ${item.paciente_ape_pat} ${item.paciente_ape_mat}`,
								descripcion: item.especialidad,
								doctor: `${item.medico_nombre} ${item.medico_ape_pat} ${item.medico_ape_mat}`,
								edificio: item.edificio,
								estado: item.estado,
							},
						};
					})
				);
			});
	}
}
