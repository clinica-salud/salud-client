import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SpinnerService {
	private spinner = signal(false);

	public onSpinner() {
		this.spinner.set(true);
	}

	public ofSpinner() {
		this.spinner.set(false);
	}

	get getStatusSpinner() {
		return this.spinner();
	}
}
