interface p5 {}

declare function text(text: string, x: number, y: number): p5
declare function textAlign(x: number, y?: number): p5
declare function textSize(size: number): p5
declare function stroke(greyscale: number): p5
declare function fill(greyscale: number): p5
declare function strokeWeight(size: number): p5
declare function background(greyscale: number): p5
declare function createCanvas(width: number, height: number, renderer?: object): p5
declare function line(x1: number, y1: number, x2: number, y2: number): p5
declare function noLoop(): void
declare function redraw(amount?: number): void
declare var CENTER: number
