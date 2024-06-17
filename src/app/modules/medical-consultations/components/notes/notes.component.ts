import { Component } from '@angular/core';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';

const NB_MODULES = [NbCardModule, NbIconModule];
const COMPONENTS = [DetailTabComponent];

@Component({
	selector: 'app-notes',
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './notes.component.html',
	styleUrl: './notes.component.scss'
})
export class NotesComponent {}
