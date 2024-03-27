import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'

import { NbMenuModule, NbSidebarModule, NbThemeModule } from '@nebular/theme'

import { spinnerInterceptor } from '@src/app/core/interceptors/spinner.interceptor'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom([HttpClientModule, NbThemeModule.forRoot(), NbMenuModule.forRoot(), NbSidebarModule.forRoot()]),
		provideAnimations(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([spinnerInterceptor]))
	]
}
