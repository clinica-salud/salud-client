export interface ILoginReq {
	email: string;
	password: string;
}

export interface ILogin {
	token: string;
}

export interface IRegisterReq {
	name: string;
	ape_pat: string;
	ape_mat: string;
	tipoid: number;
	numero: string;
	email: string;
	password: string;
}

export interface IDocumentType {
	tipoid: number;
	nombre: string;
	abreviatura: string;
	codigo_contable: string;
	longitud: number;
	tipopersona: string;
	webservice: string;
	orden: number;
	estado: boolean;
}
