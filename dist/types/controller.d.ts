import { BufferedValue, BufferedValueController, Formatter, ViewProps } from '@tweakpane/core';
import { GraphView } from './view.js';
interface Config {
    value: BufferedValue<number>;
    viewProps: ViewProps;
    formatter: Formatter<number>;
}
export declare class GraphController implements BufferedValueController<number, GraphView> {
    readonly value: BufferedValue<number>;
    readonly view: GraphView;
    readonly viewProps: ViewProps;
    constructor(doc: Document, { value, viewProps, formatter }: Config);
}
export {};
