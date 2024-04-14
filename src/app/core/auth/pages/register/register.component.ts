import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule, NbInputModule, NbSelectModule, NbToastrService } from '@nebular/theme';
import { AuthService } from '@src/app/core/services';

import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component';
import { finalize } from 'rxjs';

const NB_MODULES = [NbIconModule, NbInputModule, NbButtonModule, NbEvaIconsModule, NbSelectModule];
const COMPONENTS = [ControlErrorComponent];

const DOCUMENT_TYPES = [
	{
		tipoid: 0,
		nombre: 'NO DEFINIDO',
		abreviatura: 'ND',
		codigo_contable: '0',
		longitud: 0,
		tipopersona: 'N',
		webservice: '',
		orden: 0,
		estado: true
	},
	{
		tipoid: 2,
		nombre: 'RUC',
		abreviatura: 'RUC',
		codigo_contable: '6',
		longitud: 11,
		tipopersona: 'X',
		webservice: 'SUNAT',
		orden: 3,
		estado: true
	},
	{
		tipoid: 3,
		nombre: 'PASAPORTE',
		abreviatura: 'PASAPORTE',
		codigo_contable: '7',
		longitud: 20,
		tipopersona: 'N',
		webservice: '',
		orden: 4,
		estado: true
	},
	{
		tipoid: 4,
		nombre: 'CARNET DE EXTRANJERÍA',
		abreviatura: 'CARNET EXT',
		codigo_contable: '3',
		longitud: 20,
		tipopersona: 'N',
		webservice: '',
		orden: 5,
		estado: true
	},
	{
		tipoid: 1,
		nombre: 'DNI',
		abreviatura: 'DNI',
		codigo_contable: '1',
		longitud: 8,
		tipopersona: 'N',
		webservice: 'RENIEC',
		orden: 2,
		estado: true
	}
];

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, ...NB_MODULES, ...COMPONENTS],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	private _fb = inject(FormBuilder);
	private _router = inject(Router);
	private _authService = inject(AuthService);
	private _toastrService = inject(NbToastrService);

	public isLoading = signal(false);
	// public documentTypes = signal<any[]>([]);
	public documentTypes = signal<any[]>(DOCUMENT_TYPES);

	public form: FormGroup = this._fb.group({
		name: ['', [Validators.required]],
		ape_pat: ['', [Validators.required]],
		ape_mat: ['', [Validators.required]],
		tipoid: ['', [Validators.required]],
		numero: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	constructor() {
		// this.getDocumentTypes();
	}

	get name() {
		return this.form.controls['name'];
	}

	get ape_pat() {
		return this.form.controls['ape_pat'];
	}

	get ape_mat() {
		return this.form.controls['ape_mat'];
	}

	get tipoid() {
		return this.form.controls['tipoid'];
	}

	get numero() {
		return this.form.controls['numero'];
	}

	get email() {
		return this.form.controls['email'];
	}

	get password() {
		return this.form.controls['password'];
	}

	private getDocumentTypes() {
		this._authService.getDocumentTypes().subscribe((response) => {
			if (response && response.status) {
				this.documentTypes.set(response.data);
			}
		});
	}

	public fakeRegister() {
		this.isLoading.set(true);
		this.form.disable();

		setTimeout(() => {
			this.isLoading.set(false);
			this._router.navigateByUrl('/auth/login');
		}, 1000);
	}

	public register() {
		this.isLoading.set(true);
		this.form.disable();

		const data = { ...this.form.value };

		this._authService
			.register(data)
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
					this.form.enable();
				})
			)
			.subscribe((response) => {
				if (response && response.status) {
					this._toastrService.success('Register successful', 'Success', {
						status: 'success'
					});
					this._router.navigateByUrl('/auth/login');
				}
			});
	}
}
