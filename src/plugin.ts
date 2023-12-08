import { BaseMonitorParams, createPlugin, Formatter, MicroParser, MonitorBindingPlugin, parseRecord } from '@tweakpane/core';
import { GraphController } from './controller.js';

export interface GraphPluginParams extends BaseMonitorParams {
	view: 'graph2';
	format?: Formatter<number>;
}

export const GraphPlugin: MonitorBindingPlugin<number, GraphPluginParams> = createPlugin({
	id: 'graph2-plugin',
	type: 'monitor',

	accept(value: unknown, params: Record<string, unknown>) {
		if (typeof value !== 'number') {
			return null;
		}
		if (params['view'] !== 'graph2') {
			return null;
		}
		const result = parseRecord<GraphPluginParams>(params, (p) => ({
			view: p.required.constant('graph2'),
			readonly: p.required.constant(true),
			format: p.optional.function as MicroParser<Formatter<number>>,
			bufferSize: p.optional.number
		}));
		return result ? { initialValue: value, params: result } : null;
	},

	binding: {
		defaultBufferSize: (params) => params.bufferSize || 64,
		reader: (_args) => {
			return (value: unknown) => {
				if (typeof value === 'number') {
					return value;
				}
				if (typeof value === 'string') {
					return parseFloat(value);
				}
				return 0;
			};
		}
	},

	controller(args) {
		return new GraphController(args.document, {
			value: args.value,
			viewProps: args.viewProps,
			formatter: args.params.format || (v => v.toFixed(2))
		});
	}
});