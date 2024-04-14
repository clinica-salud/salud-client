import { registerLocaleData } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import localeEsPe from '@angular/common/locales/es';
import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
	NbDatepickerModule,
	NbDialogModule,
	NbMenuModule,
	NbSidebarModule,
	NbThemeModule,
	NbTimepickerModule,
	NbToastrModule
} from '@nebular/theme';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { authInterceptor } from '@src/app/core/interceptors';
import { spinnerInterceptor } from '@src/app/core/interceptors/spinner.interceptor';
import { routes } from './app.routes';

registerLocaleData(localeEsPe, 'es-PE');

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		importProvidersFrom([
			HttpClientModule,
			NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' }),
			NbDatepickerModule.forRoot(),
			NbDialogModule.forRoot(),
			NbMenuModule.forRoot(),
			NbSidebarModule.forRoot(),
			NbThemeModule.forRoot(),
			NbTimepickerModule.forRoot(),
			NbToastrModule.forRoot(),
			CalendarModule.forRoot({
				provide: DateAdapter,
				useFactory: adapterFactory
			})
		]),
		provideAnimations(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([spinnerInterceptor, authInterceptor]))
	]
};
