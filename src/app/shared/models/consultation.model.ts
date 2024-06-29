import { SummaryType } from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';

export interface IConsultation {
	consultaid: number;
	citaid: number;
	fecha: Date;
	hora: string;
	paciente: string;
	medico: string;
	especialidad: string;
	edificio: string;
	estado: SummaryType;
	estado_abreviatura: string;
}
