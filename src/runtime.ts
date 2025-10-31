import React from 'react';
import { transform } from './core';
import type { ResponsiveProps } from './core';

/**
 * Original React.createElement function (stored for restoration if needed)
 */
const originalCreateElement = React.createElement;

/**
 * Check if React.createElement has already been patched
 * This prevents double-patching during HMR (Hot Module Replacement)
 */
const PATCHED_SYMBOL = Symbol.for('breezy-css-patched');

/**
 * Patch React.createElement to automatically transform responsive props
 * 
 * This intercepts all JSX element creation and transforms responsive props
 * (sm, md, lg, xl, xxl) into prefixed className strings.
 * 
 * @example
 * // After patching, this JSX:
 * <div className="flex" md="flex-col" />
 * 
 * // Automatically becomes:
 * <div className="flex md:flex-col" />
 */
export function patchReact(): void {
  // Prevent double-patching (important for HMR)
  if ((React.createElement as any)[PATCHED_SYMBOL]) {
    return;
  }

  React.createElement = function breezyCSSCreateElement(
    type: any,
    props: any,
    ...children: any[]
  ) {
    // If no props or props don't have responsive breakpoints, skip transformation
    if (!props || !hasResponsiveProps(props)) {
      return originalCreateElement(type, props, ...children);
    }

    // Extract responsive props
    const { sm, md, lg, xl, xxl, className, ...restProps } = props;

    // Transform responsive props into className string
    const transformedClassName = transform({
      className,
      sm,
      md,
      lg,
      xl,
      xxl,
    });

    // Call original createElement with transformed props
    return originalCreateElement(
      type,
      { ...restProps, className: transformedClassName },
      ...children
    );
  } as typeof React.createElement;

  // Mark as patched
  (React.createElement as any)[PATCHED_SYMBOL] = true;
}

/**
 * Restore React.createElement to its original state
 * Useful for cleanup or testing
 */
export function unpatchReact(): void {
  React.createElement = originalCreateElement;
  delete (React.createElement as any)[PATCHED_SYMBOL];
}

/**
 * Quick check if props object contains responsive breakpoints
 */
function hasResponsiveProps(props: any): boolean {
  return !!(props.sm || props.md || props.lg || props.xl || props.xxl);
}
