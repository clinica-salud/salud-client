import { Component, computed, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
	NbCardModule,
	NbLayoutModule,
	NbMenuModule,
	NbSidebarModule,
	NbSpinnerModule
} from '@nebular/theme';

import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';

import { FooterComponent } from '@src/app/core/layout/components/footer/footer.component';
import { HeaderComponent } from '@src/app/core/layout/components/header/header.component';
import { Menu, MenuService, SpinnerService } from '@src/app/core/services';

const NB_MODULES = [NbLayoutModule, NbSpinnerModule, NbSidebarModule, NbMenuModule, NbCardModule];
const BREADCRUMB = [BreadcrumbComponent, BreadcrumbItemDirective];
const COMPONENTS = [FooterComponent, HeaderComponent];

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [RouterOutlet, ...NB_MODULES, ...BREADCRUMB, ...COMPONENTS],
	template: `
		<div [nbSpinner]="spinner()" nbSpinnerSize="giant" nbSpinnerStatus="primary">
			<nb-layout windowMode>
				<nb-layout-header fixed>
					<app-header></app-header>
				</nb-layout-header>

				<nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
					<nb-menu [items]="menu()"></nb-menu>
				</nb-sidebar>

				<nb-layout-column>
					<nb-card class="mb-0" style="min-height: calc(100dvh - 80px)">
						<nb-card-body>
							<xng-breadcrumb separator="&rsaquo;"></xng-breadcrumb>
							<router-outlet />
						</nb-card-body>
					</nb-card>
				</nb-layout-column>

				<!-- <nb-layout-footer fixed>
					<app-footer></app-footer>
				</nb-layout-footer> -->
			</nb-layout>
		</div>
	`,
	styleUrl: './layout.component.scss'
})
export class LayoutComponent {
	private _spinnerService = inject(SpinnerService);
	private _menuService = inject(MenuService);

	public menu = signal<Menu[]>(this._menuService.menu());
	public spinner = computed(() => this._spinnerService.spinner());
}
