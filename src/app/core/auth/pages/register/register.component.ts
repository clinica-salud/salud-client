import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';

import { AuthService } from '@src/app/core/services';
import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component';
import { IRegisterReq } from '@src/app/shared/models/auth.model';

const NB_MODULES = [NbIconModule, NbInputModule, NbButtonModule, NbEvaIconsModule, NbSelectModule];
const COMPONENTS = [ControlErrorComponent];

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, AsyncPipe, ...NB_MODULES, ...COMPONENTS],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent {
	private _authService = inject(AuthService);
	private _destroyRef = inject(DestroyRef);
	private _fb = inject(FormBuilder);
	private _router = inject(Router);

	public isLoading = signal(false);
	public documentTypes$ = this._authService.getDocumentTypes();

	public form: FormGroup = this._fb.group({
		name: ['', [Validators.required]],
		ape_pat: ['', [Validators.required]],
		ape_mat: ['', [Validators.required]],
		tipoid: ['', [Validators.required]],
		numero: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	get f() {
		return this.form.controls;
	}

	public register() {
		this.isLoading.set(true);
		this.form.disable();

		const registerRequest: IRegisterReq = {
			name: this.f['name'].value,
			ape_pat: this.f['ape_pat'].value,
			ape_mat: this.f['ape_mat'].value,
			tipoid: this.f['tipoid'].value,
			numero: this.f['numero'].value,
			email: this.f['email'].value,
			password: this.f['password'].value
		};

		this._authService
			.register(registerRequest)
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
					this.form.enable();
				}),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => this._router.navigateByUrl('/auth/login'));
	}
}
