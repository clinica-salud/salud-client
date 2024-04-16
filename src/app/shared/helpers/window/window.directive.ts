import { DestroyRef, Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { NbThemeService } from '@nebular/theme';

@Directive({
	selector: '[appWindow]',
	standalone: true
})
export class WindowDirective implements OnInit {
	private _themeService = inject(NbThemeService);
	private _el = inject(ElementRef);
	private _destroyRef = inject(DestroyRef);

	@Input() widthSize?: string;

	private SIZES_MODAL: { [key: string]: number } = {
		TN: 420,
		SM: 576,
		MD: 768,
		LG: 992,
		XL: 1200,
		XXL: 1400
	};

	constructor() {
		this._el.nativeElement.style.borderRadius = '10px';
		this._el.nativeElement.style.marginBottom = 0;
		this._el.nativeElement.style.maxHeight = 'calc(100dvh - 5rem)';
		this._el.nativeElement.style.maxWidth = '95dvw';
		this._el.nativeElement.style.paddingBlock = '0.5rem';
	}

	ngOnInit(): void {
		this._themeService
			.onMediaQueryChange()
			.pipe(
				map(([, currentBreakpoint]) => currentBreakpoint.width),
				map((width: number) => {
					if (this.widthSize) {
						if (width === 0) return '100%';
						const newWidth = this.SIZES_MODAL[this.widthSize.toUpperCase()];
						return newWidth && width >= newWidth ? newWidth : width;
					} else {
						return width;
					}
				}),
				takeUntilDestroyed(this._destroyRef)
			)
			.subscribe((value) => {
				this._el.nativeElement.style.width = `${value}px`;
			});
	}
}
