import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-appointments',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class AppointmentsComponent {}
