import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbCardModule, NbIconModule, NbTabsetModule } from '@nebular/theme';

import * as d3 from 'd3';

import { DetailTabComponent } from '@src/app/modules/medical-consultations/components/detail-tab/detail-tab.component';

const NB_MODULES = [NbCardModule, NbTabsetModule, NbIconModule];
const COMPONENTS = [DetailTabComponent];

@Component({
	selector: 'app-detail',
	standalone: true,
	imports: [...NB_MODULES, ...COMPONENTS],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
	@ViewChild('odontogramContainer', { static: true }) private odontogramContainer!: ElementRef;

	ngOnInit(): void {
		// this.drawOdontogram();
	}

	private drawOdontogram(): void {
		const svg = d3
			.select(this.odontogramContainer.nativeElement)
			.append('svg')
			.attr('width', 800)
			.attr('height', 600)
			// add background-color
			.style('background-color', '#f5f5f5');

		const width = 40; // Desired width of the triangle
		const height = 20; // Desired height of the triangle
		const centerSize = 20; // Radius of the center circle

		// Data representing positions of each section relative to the tooth center
		const sectionPositions = [
			{ dx: -width / 2, dy: 0, shape: 'triangle', label: 'left', id: 'UR1' },
			{ dx: width / 2, dy: 0, shape: 'triangle', label: 'right', id: 'UR2' },
			{ dx: 0, dy: -height / 2, shape: 'triangle', label: 'top', id: 'UL' },
			{ dx: 0, dy: height / 2, shape: 'triangle', label: 'bottom', id: 'LL' },
			{ dx: 0, dy: 0, shape: 'square', label: 'center', id: 'ULL' }
		];

		// Draw tooth sections
		svg
			.selectAll('g')
			.data(sectionPositions)
			.enter()
			.append('g')
			.attr('transform', (d) => {
				// Determine rotation angle based on section label
				let rotationAngle = 0;
				if (d.label === 'bottom') {
					// Rotate the bottom triangle by 180 degrees (π radians)
					rotationAngle = Math.PI;
				} else if (d.label === 'left') {
					// Rotate the left triangle by -90 degrees (π / 2 radians)
					rotationAngle = -Math.PI / 2;
				} else if (d.label === 'right') {
					// Rotate the right triangle by 90 degrees (π / 2 radians)
					rotationAngle = Math.PI / 2;
				}
				return `translate(${400 + d.dx}, ${300 + d.dy}) rotate(${rotationAngle * (180 / Math.PI)})`;
			}) // Centered at (400, 300) with rotation
			.each(function (d) {
				if (d.shape === 'square') {
					// Draw square for the center section
					const square = d3
						.select(this)
						.append('rect')
						.attr('x', -centerSize / 2)
						.attr('y', -centerSize / 2)
						.attr('width', centerSize)
						.attr('height', centerSize)
						.style('fill', 'lightblue')
						.style('stroke', 'black')
						.style('stroke-width', 2)
						.style('cursor', 'pointer');

					// Add hover effect to the square
					square
						.on('mouseover', () => {
							square.style('fill', 'orange'); // Change fill color on hover
						})
						.on('mouseout', () => {
							square.style('fill', 'lightblue'); // Restore fill color on mouse out
						})
						.on('click', () => {
							console.log(`Clicked ${d.id} section`);
							// Handle click logic here
						});
				} else {
					// Draw triangular sections
					let points = [];

					if (d.label === 'left') {
						points = [
							[-width / 2, 0],
							[width / 2, 0],
							[0, height]
						];
					} else if (d.label === 'right') {
						points = [
							[width / 2, 0],
							[-width / 2, 0],
							[0, height]
						];
					} else {
						points = [
							[-width / 2, -height / 2],
							[width / 2, -height / 2],
							[0, height / 2]
						];
					}

					const triangle = d3
						.select(this)
						.append('polygon')
						.attr('points', points.join(' '))
						.style('fill', 'lightblue')
						.style('stroke', 'black')
						.style('stroke-width', 2)
						.style('cursor', 'pointer');

					// Add hover effect to the triangle
					triangle
						.on('mouseover', () => {
							triangle.style('fill', 'orange'); // Change fill color on hover
						})
						.on('mouseout', () => {
							triangle.style('fill', 'lightblue'); // Restore fill color on mouse out
						})
						.on('click', () => {
							console.log(`Clicked ${d.id} section`);
							// Handle click logic here
						});
				}
			});
	}
}
