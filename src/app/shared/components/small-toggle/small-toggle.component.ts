import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

const STATUS = {
	basic: 'basic',
	primary: 'primary',
	success: 'success',
	warning: 'warning',
	danger: 'danger',
	info: 'info'
};

@Component({
	selector: 'small-toggle',
	standalone: true,
	imports: [NgClass],
	templateUrl: './small-toggle.component.html',
	styleUrl: './small-toggle.component.scss'
})
export class SmallToggleComponent {
	@Input() leftLabel = '';
	@Input() label = '';
	@Input() status = STATUS.basic;
	@Input() checked = false;
	@Input() disabled = false;

	@Output() onToggle = new EventEmitter<boolean>();

	toggle($event: Event) {
		const checked = ($event.target as HTMLInputElement).checked;
		this.onToggle.emit(checked);
	}
}
