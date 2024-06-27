import { InjectionToken } from '@angular/core';

const defaultErrors: {
	[key: string]: any;
} = {
	required: () => 'Este campo es requerido.',
	minlength: ({ requiredLength, _ }: any) =>
		`Este campo debe tener un minimo de ${requiredLength} caracteres.`,
	maxlength: ({ requiredLength, _ }: any) =>
		`Este campo debe tener un maximo de ${requiredLength} caracteres.`,
	email: () => 'Email no es valido.',
	pattern: () => `Este campo solo acepta números.`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
	providedIn: 'root',
	factory: () => defaultErrors
});
