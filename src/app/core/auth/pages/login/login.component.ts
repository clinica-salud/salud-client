import { Component, inject } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule } from '@nebular/theme'

import { ControlErrorComponent } from '@src/app/shared/helpers/control-error/control-error.component'

const COMPONENTS = [ControlErrorComponent]
const NB_MODULES = [NbLayoutModule, NbCardModule, NbIconModule, NbInputModule, NbButtonModule, NbEvaIconsModule]

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, ...NB_MODULES, ...COMPONENTS],
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private _fb = inject(FormBuilder)
	private _router = inject(Router)

	public form: FormGroup = this._fb.group({
		username: ['', [Validators.required]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	})

	get username(): FormControl {
		return this.form.get('username') as FormControl
	}

	get password(): FormControl {
		return this.form.get('password') as FormControl
	}

	public login(): void {
		this._router.navigateByUrl('/')
	}
}
