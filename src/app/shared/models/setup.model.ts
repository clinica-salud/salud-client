export interface IDoctor {
	medicoid: number;
	nombre_completo: string;
	especialidad: string;
}

export interface ITypesService {
	tiposervicioid: number;
	nombre: string;
	abreviatura: string;
}

export interface ITypesSpeciality {
	especialidadid: number;
	nombre: string;
	nombre_corto: string;
}

export interface ITypesTreatment {
	tipotratamientoid: number;
	nombre: string;
	abreviatura: string;
}

export interface IPersona {
	personaid: number;
	dni: string;
	ape_pat: string;
	ape_mat: string;
	nombre: string;
}

export interface ICost {
	costoid: number;
	costo: number;
	tiposervicioid: number;
	medicoid: number;
	especialidadid: number;
}
