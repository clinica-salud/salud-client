import { SummaryType } from '@src/app/modules/appointments/components/summary-modal/summary-modal.component';

export interface IAppointment {
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

export interface IStatus {
	estadoid: number;
	nombre: string;
	abreviatura: string;
}
