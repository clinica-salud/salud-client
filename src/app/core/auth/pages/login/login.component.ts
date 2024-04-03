import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCheckboxModule, NbIconModule, NbInputModule } from '@nebular/theme';

import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component';

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

	public form: FormGroup = this._fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	get email(): FormControl {
		return this.form.get('email') as FormControl;
	}

	get password(): FormControl {
		return this.form.get('password') as FormControl;
	}

	public login(): void {
		this._router.navigateByUrl('/');
	}
}
