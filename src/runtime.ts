import React from 'react';
import { transform } from './core';
import type { ResponsiveProps } from './core';

/**
 * Check if React.createElement has already been patched
 */
const PATCHED_SYMBOL = Symbol.for('breezy-css-patched');

/**
 * Patch React.createElement to transform responsive props
 * 
 * Note: This is a fallback approach for environments where the build-time
 * plugin cannot be used. Prefer using the Vite/Webpack/Rollup plugin for
 * better performance.
 */
export function patchReact(): void {
  // Prevent double-patching
  if ((React.createElement as any)[PATCHED_SYMBOL]) {
    return;
  }

  const originalCreateElement = React.createElement;

  React.createElement = function breezyCSSCreateElement(
    type: any,
    props: any,
    ...children: any[]
  ) {
    if (!props || !hasResponsiveProps(props)) {
      return originalCreateElement(type, props, ...children);
    }

    const { sm, md, lg, xl, xxl, className, ...restProps } = props;

    const transformedClassName = transform({
      className,
      sm,
      md,
      lg,
      xl,
      xxl,
    });

    return originalCreateElement(
      type,
      { ...restProps, className: transformedClassName },
      ...children
    );
  } as typeof React.createElement;

  (React.createElement as any)[PATCHED_SYMBOL] = true;
}

/**
 * Restore React.createElement to its original state
 */
export function unpatchReact(): void {
  // Restoration would require storing the original
  console.warn('[breezy-css] unpatchReact not fully implemented');
}

/**
 * Quick check if props contains responsive breakpoints
 */
function hasResponsiveProps(props: any): boolean {
  return !!(props.sm || props.md || props.lg || props.xl || props.xxl);
}
