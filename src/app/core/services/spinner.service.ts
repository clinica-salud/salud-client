import { Injectable, computed, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SpinnerService {
	#spinner = signal(false);
	#count = signal(0);

	public spinner = computed(() => this.#spinner());

	public onSpinner() {
		this.#spinner.set(true);
		this.#count.update((count) => count + 1);
	}

	public ofSpinner() {
		this.#count.update((count) => count - 1);
		if (this.#count() === 0) this.#spinner.set(false);
	}
}
