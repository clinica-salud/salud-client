import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { delay, finalize } from 'rxjs';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule } from '@nebular/theme';

import { AuthService } from '@src/app/core/services';
import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component';
import { ILoginReq } from '@src/app/shared/models/auth.model';

const NB_MODULES = [
	NbIconModule,
	NbInputModule,
	NbButtonModule,
	NbEvaIconsModule,
	NbCheckboxModule,
];
const COMPONENTS = [ControlErrorComponent];

@Component({
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, ...NB_MODULES, ...COMPONENTS],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	private _destroyRef = inject(DestroyRef);
	private _fb = inject(FormBuilder);
	private _router = inject(Router);
	private _authService = inject(AuthService);

	public isLoading = signal(false);

	public form: FormGroup = this._fb.group({
		email: ['medico@test.com', [Validators.required, Validators.email]],
		password: ['123456', [Validators.required, Validators.minLength(6)]],
		remember: [false],
	});

	get f() {
		return this.form.controls;
	}

	public login() {
		this.isLoading.set(true);
		this.form.disable();

		const loginRequest: ILoginReq = {
			email: this.f['email'].value,
			password: this.f['password'].value,
		};

		this._authService
			.login(loginRequest)
			.pipe(
				delay(200),
				finalize(() => {
					this.isLoading.set(false);
					this.form.enable();
				}),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe(() => {
				this._router.navigateByUrl('/pages');
				// this.getUserData();
			});
	}
}
