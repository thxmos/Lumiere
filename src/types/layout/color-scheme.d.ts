declare module "color-scheme" {
  export default class ColorScheme {
    constructor();
    from_hue(hue: number): this;
    scheme(name: string): this;
    variation(name: string): this;
    colors(): string[];
    colorset(): string[][];
  }
}
