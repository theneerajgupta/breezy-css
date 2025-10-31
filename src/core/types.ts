/**
 * Responsive prop names that map to TailwindCSS breakpoints
 * 
 * These props can be used on any React component to apply responsive
 * styles that automatically get prefixed with Tailwind breakpoints.
 * 
 * @example
 * ```tsx
 * <div className="flex gap-2" md="flex-col gap-4" lg="gap-6" />
 * // Becomes: <div className="flex gap-2 md:flex-col md:gap-4 lg:gap-6" />
 * ```
 */
export interface ResponsiveProps {
  /** Base className without any breakpoint prefix */
  className?: string;
  
  /** Classes applied at sm breakpoint (640px) and above */
  sm?: string;
  
  /** Classes applied at md breakpoint (768px) and above */
  md?: string;
  
  /** Classes applied at lg breakpoint (1024px) and above */
  lg?: string;
  
  /** Classes applied at xl breakpoint (1280px) and above */
  xl?: string;
  
  /** Classes applied at 2xl breakpoint (1536px) and above */
  xxl?: string;
}

/**
 * Map of prop names to their Tailwind prefixes
 * 
 * Note: xxl maps to 2xl to match Tailwind's breakpoint naming
 */
export const BREAKPOINT_MAP = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  xxl: '2xl:', // xxl becomes 2xl for Tailwind compatibility
} as const;

/**
 * Valid breakpoint names accepted by breezy-css
 */
export type Breakpoint = keyof typeof BREAKPOINT_MAP;
