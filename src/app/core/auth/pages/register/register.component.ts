import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbIconModule, NbInputModule, NbSelectModule } from '@nebular/theme';

import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component';

const NB_MODULES = [NbIconModule, NbInputModule, NbButtonModule, NbEvaIconsModule, NbSelectModule];
const COMPONENTS = [ControlErrorComponent];

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

	public form: FormGroup = this._fb.group({
		doc_type: ['', [Validators.required]],
		doc_number: ['', [Validators.required]],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

	get doc_type() {
		return this.form.controls['doc_type'];
	}

	get doc_number() {
		return this.form.controls['doc_number'];
	}

	get email() {
		return this.form.controls['email'];
	}

	get password() {
		return this.form.controls['password'];
	}

	public login() {
		this._router.navigateByUrl('/');
	}
}
