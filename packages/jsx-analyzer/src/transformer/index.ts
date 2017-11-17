import { StyleMapping, PluginOptions, CssBlockOptionsReadonly, PluginOptionsReader } from 'css-blocks';

export interface RewriterOptions {
  meta?: { [metaProp: string]: any };
  cssBlocks: {
    styleMapping: StyleMapping | null;
    compilationOptions: PluginOptions;
  };
}

export interface RewriterOutput {
  source: string;
  map: any;
}

// TODO: The entire point of this class is to serve as a transport mechanism for
//       our StyleMapping across the Webpack/Typescript/Babel barrier. This will
//       be replaced by serializing the Mapping to JSON in the loader, appending
//       it in a comment sourcemaps style to the file, and hydrating/removing it
//       in the transformer. Remove this when that is added.
export default class CSSBlocksJSXTransformer {

  private styleMapping: StyleMapping | null;
  cssBlockOptions: CssBlockOptionsReadonly;
  blocks: { [path: string]: StyleMapping } = {};

  constructor(opts?: RewriterOptions) {
    this.cssBlockOptions = new PluginOptionsReader(opts && opts.cssBlocks && opts.cssBlocks.compilationOptions);
    this.styleMapping = opts && opts.cssBlocks && opts.cssBlocks.styleMapping || null;
  }

}
