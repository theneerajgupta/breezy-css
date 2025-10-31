/**
 * Breezy CSS - Responsive TailwindCSS props for React
 * 
 * @packageDocumentation
 */

// Export core utilities
export { transform, hasResponsiveProps, BREAKPOINT_MAP } from './core';
export type { ResponsiveProps, Breakpoint } from './core';

// Export runtime utilities (for advanced users)
export { patchReact, unpatchReact } from './runtime';

// Re-export type declarations (ensures they're available)
export type {} from './types';
