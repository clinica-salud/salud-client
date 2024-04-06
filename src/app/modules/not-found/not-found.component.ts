import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { NbButtonModule, NbCardModule } from '@nebular/theme';

const NB_MODULES = [NbCardModule, NbButtonModule];

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [...NB_MODULES],
	template: `
		<div class="d-flex align-items-center justify-content-center" style="height: calc(100dvh - 188px)">
			<div class="text-center">
				<h2>404 Página no encontrada</h2>
				<small class="d-block mb-3 fw-semibold">La página que solicitaste no existe</small>
				<button nbButton fullWidth (click)="returnToHome()" type="button" class="mt-4">Ir a inicio</button>
			</div>
		</div>
	`
})
export class NotFoundComponent {
	private _router = inject(Router);

	returnToHome() {
		this._router.navigateByUrl('/');
	}
}
