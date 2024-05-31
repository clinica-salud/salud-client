import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { NbCardModule, NbLayoutModule } from '@nebular/theme';

import { BackgroundComponent } from '@src/app/core/auth/components/background/background.component';
import { LogoNameComponent } from '@src/app/core/auth/components/logo-name/logo-name.component';
import { AuthService } from '@src/app/core/services';

const NB_MODULES = [NbLayoutModule, NbCardModule];
const COMPONENTS = [BackgroundComponent, LogoNameComponent];

@Component({
	selector: 'app-auth',
	standalone: true,
	imports: [RouterOutlet, ...NB_MODULES, ...COMPONENTS],
	template: `
		<nb-layout>
			<nb-layout-column class="p-0">
				<div class="main-container">
					<app-background class="images" />
					<div class="form">
						<nb-card class="p-0 mb-0">
							<nb-card-body class="px-4 px-sm-5 py-5 ">
								<app-logo-name />
								<div class="mt-0">
									<router-outlet />
								</div>
							</nb-card-body>
						</nb-card>
					</div>
				</div>
			</nb-layout-column>
		</nb-layout>
	`,
	styles: `
		.main-container {
			display: grid;
			grid-template-columns: repeat(9, 1fr);
			min-height: 100dvh;

			.images {
				grid-column: 1 / span 6;
			}

			.form {
				grid-column: 7 / span 3;
			}

			nb-card {
				border: none;
				height: 100dvh;
			}

			nb-card-body {
				padding-block: 2rem;
			}

			@media screen and (max-width: 1200px) {
				.images {
					grid-column: 1 / span 5;
				}

				.form {
					grid-column: 6 / span 4;
				}
			}

			@media screen and (max-width: 1024px) {
				.images {
					grid-column: 1 / span 4;
				}

				.form {
					grid-column: 5 / span 5;
				}
			}

			@media screen and (max-width: 768px) {
				.images {
					display: none;
				}

				.form {
					grid-column: 1 / span 9;
				}
			}

			@media screen and (max-height: 800px) {
				nb-card-body {
					padding-block: 2rem;
				}
			}

		}`
})
export class AuthComponent {
	private _authService = inject(AuthService);
	private _router = inject(Router);

	constructor() {
		if (this._authService.isLoggedIn()) this._router.navigateByUrl('/pages');
	}
}
