import { BaseMonitorParams, Formatter, MonitorBindingPlugin } from '@tweakpane/core';
export interface GraphPluginParams extends BaseMonitorParams {
    view: 'graph2';
    format?: Formatter<number>;
}
export declare const GraphPlugin: MonitorBindingPlugin<number, GraphPluginParams>;
