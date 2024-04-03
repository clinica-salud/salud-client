import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

	get doc_type(): FormControl {
		return this.form.get('doc_type') as FormControl;
	}

	get doc_number(): FormControl {
		return this.form.get('doc_number') as FormControl;
	}

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
