import { Component, signal } from '@angular/core';

@Component({
	selector: 'app-footer',
	standalone: true,
	templateUrl: './footer.component.html'
})
export class FooterComponent {
	public currentYear = signal(new Date().getFullYear());
}
