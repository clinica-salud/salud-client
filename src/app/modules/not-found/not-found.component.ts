import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { NbButtonModule, NbCardModule, NbMenuService } from '@nebular/theme'

const NB_MODULES = [NbCardModule, NbButtonModule]

@Component({
	selector: 'app-not-found',
	standalone: true,
	imports: [...NB_MODULES],
	template: `
		<div class="d-flex align-items-center justify-content-center" style="height: calc(100dvh - 152px)">
			<div class="text-center">
				<h2>404 Page Not Found</h2>
				<small class="d-block mb-3">The page you were looking for doesn't exist</small>
				<button nbButton fullWidth (click)="goToHome()" type="button" class="home-button">Take me home</button>
			</div>
		</div>
	`
})
export class NotFoundComponent {
	private _router = inject(Router)

	goToHome() {
		this._router.navigateByUrl('/')
	}
}
