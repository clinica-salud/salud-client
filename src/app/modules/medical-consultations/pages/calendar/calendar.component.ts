import { Component } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { SmallToggleComponent } from '@src/app/shared/components/small-toggle/small-toggle.component';

const NB_MODULES = [NbCardModule];
const COMPONENTS = [SmallToggleComponent];

@Component({
	selector: 'app-calendar',
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './calendar.component.html',
	styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
	public onToggleAll(checked: boolean) {
		console.log('all', checked);
	}

	public onToggleFinished(checked: boolean) {
		console.log('finished', checked);
	}

	public onToggleCancelled(checked: boolean) {
		console.log('cancelled', checked);
	}

	public onToggleNext(checked: boolean) {
		console.log('next', checked);
	}
}
