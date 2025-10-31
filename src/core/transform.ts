import { ResponsiveProps, BREAKPOINT_MAP, Breakpoint } from './types';

/**
 * Pre-compiled regex to check if a string contains responsive props
 * This is used for early bailout optimization
 */
const HAS_RESPONSIVE_PROPS = /\s(sm|md|lg|xl|xxl)=/;

/**
 * Transform responsive props into a single className string with Tailwind breakpoint prefixes
 * 
 * This is the core transformation function that powers breezy-css. It takes responsive
 * props and merges them into a single className string with proper Tailwind prefixes.
 * 
 * @param props - Object containing className and responsive breakpoint props
 * @returns A single string with all classes properly prefixed
 * 
 * @example
 * Basic usage:
 * ```ts
 * transform({ className: "flex", md: "flex-col" })
 * // Returns: "flex md:flex-col"
 * ```
 * 
 * @example
 * Multiple breakpoints:
 * ```ts
 * transform({ className: "p-4", sm: "p-6", lg: "p-8", xxl: "p-12" })
 * // Returns: "p-4 sm:p-6 lg:p-8 2xl:p-12"
 * ```
 * 
 * @example
 * Multiple classes per breakpoint:
 * ```ts
 * transform({ md: "flex-col gap-4 p-6" })
 * // Returns: "md:flex-col md:gap-4 md:p-6"
 * ```
 */
export function transform(props: ResponsiveProps): string {
  const classes: string[] = [];
  
  // Start with base className if it exists
  if (props.className) {
    classes.push(props.className);
  }
  
  // Process each responsive prop
  const breakpoints: Breakpoint[] = ['sm', 'md', 'lg', 'xl', 'xxl'];
  
  for (const breakpoint of breakpoints) {
    const value = props[breakpoint];
    if (value) {
      // Get the Tailwind prefix (e.g., "md:" or "2xl:")
      const prefix = BREAKPOINT_MAP[breakpoint];
      
      // Split the value by spaces and prefix each class
      const prefixedClasses = value
        .split(' ')
        .filter(Boolean) // Remove empty strings
        .map(cls => `${prefix}${cls}`)
        .join(' ');
      
      if (prefixedClasses) {
        classes.push(prefixedClasses);
      }
    }
  }
  
  return classes.join(' ');
}

/**
 * Quick check to see if code contains responsive props
 * 
 * Used by the unplugin for early bailout optimization. Most files won't
 * use responsive props, so we can skip transformation entirely.
 * 
 * @param code - Source code string to check
 * @returns true if code contains sm/md/lg/xl/xxl prop assignments
 * 
 * @example
 * ```ts
 * hasResponsiveProps('<div className="flex" md="flex-col" />')
 * // Returns: true
 * 
 * hasResponsiveProps('<div className="flex gap-2" />')
 * // Returns: false
 * ```
 */
export function hasResponsiveProps(code: string): boolean {
  return HAS_RESPONSIVE_PROPS.test(code);
}
