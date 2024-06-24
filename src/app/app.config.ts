import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localeEsPe from '@angular/common/locales/es';
import {
	ApplicationConfig,
	LOCALE_ID,
	importProvidersFrom,
	provideZoneChangeDetection
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';

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

import {
	authInterceptor,
	catchErrorInterceptor,
	spinnerInterceptor
} from '@src/app/core/interceptors';

import { routes } from './app.routes';

registerLocaleData(localeEsPe, 'es-PE');

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: LOCALE_ID, useValue: 'es-PE' },
		importProvidersFrom([
			NbDatepickerModule.forRoot(),
			NbDialogModule.forRoot(),
			NbMenuModule.forRoot(),
			NbSidebarModule.forRoot(),
			NbThemeModule.forRoot(),
			NbTimepickerModule.forRoot(),
			NbToastrModule.forRoot(),
			NbDateFnsDateModule.forRoot({ format: 'dd/MM/yyyy' }),
			CalendarModule.forRoot({
				provide: DateAdapter,
				useFactory: adapterFactory
			})
		]),
		provideAnimations(),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withHashLocation(), withViewTransitions({ skipInitialTransition: true })),
		provideHttpClient(
			withInterceptors([authInterceptor, catchErrorInterceptor, spinnerInterceptor])
		)
	]
};
