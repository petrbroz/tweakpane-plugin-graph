import { BufferedValue, Formatter, View, ViewProps } from '@tweakpane/core';
interface Config {
    value: BufferedValue<number>;
    viewProps: ViewProps;
    formatter: Formatter<number>;
}
export declare class GraphView implements View {
    readonly value: BufferedValue<number>;
    readonly formatter: Formatter<number>;
    readonly element: HTMLElement;
    readonly svg: SVGSVGElement;
    readonly polyline: SVGPolylineElement;
    readonly min: SVGTextElement;
    readonly max: SVGTextElement;
    readonly last: SVGTextElement;
    constructor(doc: Document, { value, viewProps, formatter }: Config);
    private refresh;
    private onValueChange;
}
export {};
