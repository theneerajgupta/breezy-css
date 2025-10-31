/**
 * Breezy CSS plugin for Vite
 * 
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite';
 * import breezy from 'breezy-css/vite';
 * 
 * export default defineConfig({
 *   plugins: [breezy()],
 * });
 * ```
 */
import unplugin from './unplugin';

export default unplugin.vite;
