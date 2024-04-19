import { Abreviatura, Fila, Nombre } from '@src/app/shared/enums/odontogram.enum';

export interface ITooth {
	piezaid: number;
	tipoodontogramaid: number;
	abreviatura: Abreviatura;
	nombre: Nombre;
	fila: Fila;
	numero: number;
	imagen: string;
}

export interface IToothMinimal {
	piezaid: number;
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
