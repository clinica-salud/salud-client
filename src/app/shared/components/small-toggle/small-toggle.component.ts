import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
	imports: [NgClass, ReactiveFormsModule],
	templateUrl: './small-toggle.component.html',
	styleUrl: './small-toggle.component.scss'
})
export class SmallToggleComponent {
	@Input() control: FormControl = new FormControl();
	@Output() toggle = new EventEmitter<boolean>();

	@Input() leftLabel = '';
	@Input() label = '';
	@Input() status = STATUS.basic;

	@Input() set checked(value: boolean) {
		this.control.setValue(value);
	}

	@Input() set disabled(value: boolean) {
		value ? this.control.disable() : this.control.enable();
	}

	onToggle($event: Event) {
		const checked = ($event.target as HTMLInputElement).checked;
		this.toggle.emit(checked);
	}
}
