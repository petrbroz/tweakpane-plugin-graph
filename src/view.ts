import { BufferedValue, ClassName, Formatter, View, ViewProps } from '@tweakpane/core';

interface Config {
	value: BufferedValue<number>;
	viewProps: ViewProps;
	formatter: Formatter<number>;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_WIDTH = 160;
const SVG_HEIGHT = 60;

const className = ClassName('tmp');

export class GraphView implements View {
	public readonly value: BufferedValue<number>;
	public readonly formatter: Formatter<number>;
	public readonly element: HTMLElement;
	public readonly svg: SVGSVGElement;
	public readonly polyline: SVGPolylineElement;
	public readonly min: SVGTextElement;
	public readonly max: SVGTextElement;
	public readonly last: SVGTextElement;

	constructor(doc: Document, { value, viewProps, formatter }: Config) {
		this.formatter = formatter;
		this.value = value;
		this.value.emitter.on('change', this.onValueChange.bind(this));

		this.element = doc.createElement('div');
		this.element.classList.add(className());
		this.element.style.width = `${SVG_WIDTH}px`;
		this.element.style.height = `${SVG_HEIGHT}px`;
		viewProps.bindClassModifiers(this.element);

		this.svg = doc.createElementNS(SVG_NS, 'svg');
		this.svg.style.width = `${SVG_WIDTH}px`;
		this.svg.style.height = `${SVG_HEIGHT}px`;
		this.element.appendChild(this.svg);

		this.polyline = doc.createElementNS(SVG_NS, 'polyline');
		this.polyline.setAttributeNS(null, 'fill', 'none');
		this.polyline.setAttributeNS(null, 'stroke', 'gray');
		this.svg.appendChild(this.polyline);

		this.min = doc.createElementNS(SVG_NS, 'text');
		this.min.setAttributeNS(null, 'x', '0');
		this.min.setAttributeNS(null, 'y', SVG_HEIGHT.toString());
		this.min.setAttributeNS(null, 'text-anchor', 'start');
		this.min.setAttributeNS(null, 'fill', 'lightgray');
		this.svg.appendChild(this.min);
		this.max = doc.createElementNS(SVG_NS, 'text');
		this.max.setAttributeNS(null, 'x', '0');
		this.max.setAttributeNS(null, 'y', '10');
		this.max.setAttributeNS(null, 'text-anchor', 'start');
		this.max.setAttributeNS(null, 'fill', 'lightgray');
		this.svg.appendChild(this.max);
		this.last = doc.createElementNS(SVG_NS, 'text');
		this.last.setAttributeNS(null, 'x', '160');
		this.last.setAttributeNS(null, 'y', '35');
		this.last.setAttributeNS(null, 'text-anchor', 'end');
		this.last.setAttributeNS(null, 'fill', 'lightgray');
		this.svg.appendChild(this.last);

		this.refresh();
		viewProps.handleDispose(() => { /* TODO */ });
	}

	private refresh(): void {
		const values = this.value.rawValue;
		const bufferSize = values.length;
		const points: string[] = [];
		let min = 0, max = 0, last = 0;
		for (let i = 0; i < bufferSize; i++) {
			const val = values[i];
			if (typeof val !== 'undefined') {
				min = Math.min(min, val);
				max = Math.max(max, val);
			}
		}
		for (let i = 0; i < bufferSize; i++) {
			const val = values[i];
			if (typeof val !== 'undefined') {
				points.push(`${Math.floor(SVG_WIDTH * i / bufferSize)},${Math.floor(SVG_HEIGHT * (1.0 - (val - min) / (max - min)))}`);
				last = val;
			}
		}
		this.polyline.setAttributeNS(null, 'points', points.join(' '));
		this.min.innerHTML = this.formatter(min);
		this.max.innerHTML = this.formatter(max);
		this.last.innerHTML = this.formatter(last);
	}

	private onValueChange() {
		this.refresh();
	}
}