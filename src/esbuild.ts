/**
 * Breezy CSS plugin for esbuild
 * 
 * @example
 * ```js
 * // esbuild.config.js
 * import breezy from 'breezy-css/esbuild';
 * import { build } from 'esbuild';
 * 
 * build({
 *   plugins: [breezy()],
 * });
 * ```
 */
import unplugin from './unplugin';

export default unplugin.esbuild;
