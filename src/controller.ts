import { BufferedValue, BufferedValueController, Formatter, ViewProps } from '@tweakpane/core';
import { GraphView } from './view.js';

interface Config {
	value: BufferedValue<number>;
	viewProps: ViewProps;
	formatter: Formatter<number>;
}

export class GraphController implements BufferedValueController<number, GraphView> {
	public readonly value: BufferedValue<number>;
	public readonly view: GraphView;
	public readonly viewProps: ViewProps;

	constructor(doc: Document, { value, viewProps, formatter }: Config) {
		this.value = value;
		this.viewProps = viewProps;
		this.viewProps.handleDispose(() => { /* TODO */ });
		this.view = new GraphView(doc, {
			value: this.value,
			viewProps: this.viewProps,
			formatter
		});
	}
}