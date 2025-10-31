/**
 * Breezy CSS plugin for Webpack
 * 
 * @example
 * ```js
 * // webpack.config.js
 * const breezy = require('breezy-css/webpack');
 * 
 * module.exports = {
 *   plugins: [breezy()],
 * };
 * ```
 * 
 * @example
 * Next.js usage:
 * ```js
 * // next.config.js
 * const breezy = require('breezy-css/webpack');
 * 
 * module.exports = {
 *   webpack: (config) => {
 *     config.plugins.push(breezy());
 *     return config;
 *   },
 * };
 * ```
 */
import unplugin from './unplugin';

export default unplugin.webpack;
