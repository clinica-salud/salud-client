import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-adult',
	standalone: true,
	imports: [],
	templateUrl: './adult.component.html',
	styleUrl: './adult.component.scss'
})
export class AdultComponent {
	@Output() public selectedTooth: EventEmitter<string> = new EventEmitter<string>();

	public selected(id: string) {
		this.selectedTooth.next(id);
	}
}
