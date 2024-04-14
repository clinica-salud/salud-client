import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule, NbToastrService } from '@nebular/theme';
import { AuthService, LoginData } from '@src/app/core/services';

import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component';
import { finalize } from 'rxjs';

const NB_MODULES = [NbIconModule, NbInputModule, NbButtonModule, NbEvaIconsModule, NbCheckboxModule];
const COMPONENTS = [ControlErrorComponent];

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, RouterLink, ...NB_MODULES, ...COMPONENTS],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	private _fb = inject(FormBuilder);
	private _router = inject(Router);
	private _toastrService = inject(NbToastrService);
	private _authService = inject(AuthService);

	public isLoading = signal(false);

	public form: FormGroup = this._fb.group({
		email: ['test@test.com', [Validators.required, Validators.email]],
		password: ['ramirez', [Validators.required, Validators.minLength(6)]],
		remember: [false]
	});

	get email() {
		return this.form.controls['email'];
	}

	get password() {
		return this.form.controls['password'];
	}

	public fakeLogin() {
		this.isLoading.set(true);
		this.form.disable();

		setTimeout(() => {
			this.isLoading.set(false);
			this._router.navigateByUrl('/pages');
		}, 1000);
	}

	public login() {
		this.isLoading.set(true);
		this.form.disable();

		const data: LoginData = {
			email: this.email.value,
			password: this.password.value
		};

		this._authService
			.login(data)
			.pipe(
				finalize(() => {
					this.isLoading.set(false);
					this.form.enable();
				})
			)
			.subscribe((response) => {
				if (response && response.status) {
					this._toastrService.success('Login successful', 'Success', {
						status: 'success'
					});
					setTimeout(() => {
						this._router.navigateByUrl('/pages');
					}, 300);
				} else {
					this._toastrService.danger(response.message, 'Error', {
						status: 'danger'
					});
				}
			});
	}
}
