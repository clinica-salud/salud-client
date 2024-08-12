import { Abreviatura, Fila, TeethName } from '@src/app/shared/enums/odontogram.enum';

export interface ITooth {
	piezaid: number;
	tipoodontogramaid: number;
	abreviatura: Abreviatura;
	nombre: TeethName;
	fila: Fila;
	numero: number;
	imagen: string;
	color?: string;
}

export interface IToothMinimal {
	piezaid: number;
	fila: string;
	numero: number;
}

export interface ITreatment {
	tipotratamientoid: number;
	nombre: string;
	abreviatura: string;
	imagen: string;
	orden: number;
	estado: boolean;
}

export interface IFace {
	tipocaraid: number;
	nombre: string;
	abreviatura: string;
	orden: number;
	estado: boolean;
}

export interface IPhase {
	faseodontogramaid: number;
	nombre: string;
	abreviatura: string;
	color: string;
	orden: number;
	estado: boolean;
}
