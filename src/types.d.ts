/**
 * Global type augmentation for breezy-css
 * 
 * This file extends React's type definitions to include responsive props
 * on all HTML and SVG elements, enabling TypeScript autocomplete and validation.
 */

import 'react';

declare module 'react' {
  /**
   * Responsive props that can be applied to any HTML element
   */
  interface HTMLAttributes<T> {
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
   * Responsive props for SVG elements
   */
  interface SVGAttributes<T> {
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
}
