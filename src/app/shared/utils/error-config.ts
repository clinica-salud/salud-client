import { InjectionToken } from '@angular/core';

const defaultErrors: {
	[key: string]: any;
} = {
	required: () => 'Este campo es requerido.',
	minlength: ({ requiredLength, actualLength }: any) =>
		`Este campo debe tener un minimo de ${requiredLength} caracteres.`,
	maxlength: ({ requiredLength, actualLength }: any) =>
		`Este campo debe tener un maximo de ${requiredLength} caracteres.`,
	email: () => 'Email no es valido.'
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
	providedIn: 'root',
	factory: () => defaultErrors
});
