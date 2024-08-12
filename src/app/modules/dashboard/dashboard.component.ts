import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from '@src/app/modules/not-found/not-found.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [RouterModule, NotFoundComponent],
	template: ` <router-outlet /> `,
})
export class DashboardComponent {}
