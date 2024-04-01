import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbDatepickerModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbTimepickerModule } from '@nebular/theme';

import { spinnerInterceptor } from '@src/app/core/interceptors/spinner.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom([
			HttpClientModule,
			NbThemeModule.forRoot(),
			NbMenuModule.forRoot(),
			NbSidebarModule.forRoot(),
			NbDatepickerModule.forRoot(),
			NbTimepickerModule.forRoot(),
			NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' })
		]),
		provideAnimations(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([spinnerInterceptor]))
	]
};
