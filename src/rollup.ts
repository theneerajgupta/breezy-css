/**
 * Breezy CSS plugin for Rollup
 * 
 * @example
 * ```js
 * // rollup.config.js
 * import breezy from 'breezy-css/rollup';
 * 
 * export default {
 *   plugins: [breezy()],
 * };
 * ```
 */
import unplugin from './unplugin';

export default unplugin.rollup;
