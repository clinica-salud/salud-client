import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as d3 from 'd3';

import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';

const COMPONENTS = [DetailTabComponent];

// Teeth base
const ADULT_TEETH_BASE = {
	top_left: [18, 17, 16, 15, 14, 13, 12, 11],
	top_right: [21, 22, 23, 24, 25, 26, 27, 28],
	bottom_left: [48, 47, 46, 45, 44, 43, 42, 41],
	bottom_right: [31, 32, 33, 34, 35, 36, 37, 38]
};

const ADULT_TEETH_ALL = [
	...ADULT_TEETH_BASE.top_left,
	...ADULT_TEETH_BASE.top_right,
	...ADULT_TEETH_BASE.bottom_left,
	...ADULT_TEETH_BASE.bottom_right
];

// Teeth results
const ADULT_TEETH_RESULT = [
	{ tooth: 14, zones: ['left'] },
	{ tooth: 18, zones: ['top', 'left'] },
	{ tooth: 21, zones: ['right'] },
	{ tooth: 33, zones: ['center'] },
	{ tooth: 36, zones: ['top', 'right', 'bottom', 'left', 'center'] },
	{ tooth: 48, zones: ['bottom', 'left'] }
];

const CHILD_TEETH_BASE = {
	top_left: [55, 54, 53, 52, 51],
	top_right: [61, 62, 63, 64, 65],
	bottom_left: [85, 84, 83, 82, 81],
	bottom_right: [71, 72, 73, 74, 75]
};

const CHILD_TEETH_ALL = [
	...CHILD_TEETH_BASE.top_left,
	...CHILD_TEETH_BASE.top_right,
	...CHILD_TEETH_BASE.bottom_left,
	...CHILD_TEETH_BASE.bottom_right
];

const CHILD_TEETH_RESULT = [
	{ tooth: 55, zones: ['top', 'left'] },
	{ tooth: 61, zones: ['right'] },
	{ tooth: 71, zones: ['center'] },
	{ tooth: 75, zones: ['top', 'right', 'bottom', 'left'] },
	{ tooth: 85, zones: ['bottom', 'left'] }
];

type ToothType = 'adult' | 'child';
type ToothPosition = { x: number; y: number; toothID: number };

@Component({
	selector: 'app-odontogram',
	standalone: true,
	imports: [...COMPONENTS],
	templateUrl: './odontogram.component.html',
	styleUrl: './odontogram.component.scss'
})
export class OdontogramComponent implements OnInit {
	@ViewChild('odontogramContainer', { static: true }) private odontogramContainer!: ElementRef;
	private teethType: ToothType = 'child';

	private teethGroup = this.teethType === 'adult' ? ADULT_TEETH_ALL : CHILD_TEETH_ALL;
	private teethResult = this.teethType === 'adult' ? ADULT_TEETH_RESULT : CHILD_TEETH_RESULT;

	private teethFiltered = this.teethGroup.map((tooth) => ({
		toothID: tooth,
		zones: this.teethResult.filter((result) => result.tooth === tooth).flatMap(({ zones }) => zones)
	}));

	ngOnInit(): void {
		console.log('Type: ', this.teethType);
		console.log('Teeth: ', this.teethFiltered);
		this.drawOdontogram();
	}

	private drawOdontogram() {
		// Create the SVG container
		const container = d3.select(this.odontogramContainer.nativeElement);
		const width = this.teethType === 'adult' ? 960 : 600;
		const teethResult = this.teethResult;

		// Create a div container for the SVG with scrolling enabled
		const wrapper = container
			.append('div')
			.style('width', '100%')
			.style('overflow-x', 'auto')
			.style('text-align', 'center');
		const svg = wrapper.append('svg').attr('width', width).attr('height', '155px');

		const toothWidth = 40; // Width of each tooth section
		const toothHeight = 40; // Height of each tooth section
		const paddingX = 10; // Horizontal spacing between teeth
		const paddingY = 20; // Vertical spacing between teeth

		const toothPositions: ToothPosition[] = [];

		this.teethFiltered.forEach((item, index) => {
			const { toothID } = item;

			const toothIndex = this.teethFiltered.length / 2;

			const x = (index % toothIndex) * (toothWidth + paddingX * 2) + 30;
			const y = Math.floor(index / toothIndex) * (toothHeight + paddingY * 2) + 30;

			toothPositions.push({ x, y, toothID });
		});

		// Draw each tooth based on its calculated position
		toothPositions.forEach(({ x, y, toothID }: any, index: any) => {
			const toothGroup = svg.append('g').attr('transform', `translate(${x}, ${y})`);

			toothGroup
				.selectAll('g')
				.data([
					{ dx: -toothWidth / 2, dy: 0, shape: 'triangle', label: 'left', tooth: toothID },
					{ dx: toothWidth / 2, dy: 0, shape: 'triangle', label: 'right', tooth: toothID },
					{ dx: 0, dy: -toothHeight / 2, shape: 'triangle', label: 'top', tooth: toothID },
					{ dx: 0, dy: toothHeight / 2, shape: 'triangle', label: 'bottom', tooth: toothID },
					{ dx: 0, dy: 0, shape: 'square', label: 'center', tooth: toothID }
				])
				.enter()
				.append('g')
				.attr('transform', (d) => {
					let rotationAngle = 0;
					if (d.label === 'bottom') {
						rotationAngle = Math.PI;
					} else if (d.label === 'left') {
						rotationAngle = -Math.PI / 2;
					} else if (d.label === 'right') {
						rotationAngle = Math.PI / 2;
					}
					return `translate(${d.dx}, ${d.dy}) rotate(${rotationAngle * (180 / Math.PI)})`;
				})
				.each(function (d) {
					if (d.shape === 'square' || d.shape === 'triangle') {
						const zones = teethResult.find((result) => result.tooth === toothID)?.zones;
						const fillColor = zones && zones.includes(d.label) ? 'var(--color-warning-400)' : '#f8f7f5';

						const shape = d3.select(this);

						if (d.shape === 'square') {
							shape
								.append('rect')
								.attr('x', -toothWidth / 4)
								.attr('y', -toothHeight / 4)
								.attr('width', toothWidth / 2)
								.attr('height', toothHeight / 2)
								.style('fill', fillColor)
								.style('stroke', 'black')
								.style('stroke-width', 1);
							// .style('cursor', 'pointer');
						} else if (d.shape === 'triangle') {
							const points = [
								[-toothWidth / 2, 0],
								[toothWidth / 2, 0],
								[0, toothHeight / 2]
							];

							shape
								.append('polygon')
								.attr('points', points.join(' '))
								.style('fill', fillColor)
								.style('stroke', 'black')
								.style('stroke-width', 1);
							// .style('cursor', 'pointer');
						}

						// shape
						// .on('mouseover', () => {
						// 	shape.select('rect, polygon').style('fill', 'orange'); // Highlight on mouseover
						// })
						// .on('mouseout', () => {
						// 	shape.select('rect, polygon').style('fill', fillColor); // Restore original fill on mouseout
						// })
						// .on('click', () => {
						// 	shape.select('rect, polygon').style('fill', 'purple'); // Change to purple on click
						// 	console.log(`${toothID}: ${d.label}`);
						// });
					}
				});

			// Add label text under the tooth
			toothGroup
				.append('text')
				.attr('x', 0)
				.attr('y', toothHeight / 2 + 10)
				.attr('text-anchor', 'middle')
				.attr('dy', '0.35em')
				.style('font-size', '13px')
				.text(`${toothID}`);

			// Draw a line separator between the two rows of teeth
			if (index === 5) {
				svg
					.append('line')
					.attr('x1', x - (toothWidth + paddingX * 2.6) * 5) // Line start X position
					.attr('y1', y + toothHeight / 2 + paddingY + 5) // Line start Y position (below first row)
					.attr('x2', x + (toothWidth + paddingX * 8.6) * 5) // Line end X position
					.attr('y2', y + toothHeight / 2 + paddingY + 5) // Line end Y position (below first row)
					.style('stroke', 'black')
					.style('stroke-width', 2);
			}

			// Draw a line separator between the two columns of teeth
			const middleToothIndex = Math.floor(this.teethFiltered.length / 4 - 1);
			if (index === middleToothIndex) {
				svg
					.append('line')
					.attr('x1', x + toothWidth / 2 + paddingX) // Line start X position
					.attr('y1', y - (toothHeight + paddingY * 3) * 5) // Line start Y position (below first row)
					.attr('x2', x + toothWidth / 2 + paddingX) // Line end X position
					.attr('y2', y + (toothHeight + paddingY * 1) * 5) // Line end Y position (below first row)
					.style('stroke', 'black')
					.style('stroke-width', 2);
			}
		});
	}
}
