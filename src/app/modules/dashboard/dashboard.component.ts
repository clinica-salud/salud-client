import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [RouterModule],
	template: '<router-outlet />'
})
export class DashboardComponent {}
