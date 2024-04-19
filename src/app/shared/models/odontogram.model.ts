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
