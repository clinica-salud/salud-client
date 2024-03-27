import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
	selector: 'app-medial-consultations',
	standalone: true,
	imports: [RouterOutlet],
	template: '<router-outlet />'
})
export class MedicalConsultationsComponent {}
