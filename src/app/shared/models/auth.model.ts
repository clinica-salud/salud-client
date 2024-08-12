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

export interface IProfileMenu {
	user: IProfile;
	accessMenu: IAccessMenu[];
	roles: IRole[];
}

export interface IAccessMenu {
	menuwebid: number;
	titulo: string;
	descripcion: string;
	proceso: string;
	link: string;
	orden: number;
	imagen: string;
	padreid: number;
	estado: boolean;
	cantidad_hijos: number;
	cantidad_personas: number;
}

export interface IProfile {
	id: number;
	personaid: number;
	name: string;
	email: string;
	email_verified_at: null;
	created_at: Date;
	updated_at: Date;
}

export interface IRole {
	rolid: number;
	rol: string;
}
