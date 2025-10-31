import { createUnplugin } from 'unplugin';
import { transform, hasResponsiveProps } from './core';

/**
 * Breezy CSS unplugin - transforms responsive props at build time
 * 
 * This plugin intercepts JSX/TSX files during bundling and transforms
 * responsive props (sm, md, lg, xl, xxl) into prefixed className strings.
 * 
 * @example
 * // User writes:
 * <div className="flex" md="flex-col" />
 * 
 * // Plugin transforms to:
 * <div className="flex md:flex-col" />
 */
export default createUnplugin(() => ({
  name: 'breezy-css',
  
  // Run before other plugins to ensure clean JSX transformation
  enforce: 'pre',
  
  /**
   * Transform function - processes each file during build
   */
  transform(code: string, id: string) {
    // Only process JSX/TSX files
    if (!/\.[jt]sx$/.test(id)) {
      return null;
    }
    
    // Early bailout: skip files without responsive props
    if (!hasResponsiveProps(code)) {
      return null;
    }
    
    // Transform responsive props in JSX
    return transformJSX(code);
  },
}));

/**
 * Transform JSX code by converting responsive props to className
 * 
 * Finds patterns like: md="flex-col gap-4"
 * Converts to: className="...md:flex-col md:gap-4"
 */
function transformJSX(code: string): string {
  // Regex to match responsive props: sm="..." md="..." etc.
  const RESPONSIVE_PROP_PATTERN = /(sm|md|lg|xl|xxl)=(?:"([^"]*)"|'([^']*)'|{([^}]*)})/g;
  
  // Track all responsive props found
  const responsiveProps: Record<string, string> = {};
  
  // Extract all responsive props from the code
  let match;
  while ((match = RESPONSIVE_PROP_PATTERN.exec(code)) !== null) {
    const [fullMatch, breakpoint, doubleQuoted, singleQuoted, braced] = match;
    const value = doubleQuoted || singleQuoted || braced;
    
    if (value) {
      responsiveProps[breakpoint] = value;
    }
  }
  
  // If no responsive props found, return unchanged
  if (Object.keys(responsiveProps).length === 0) {
    return code;
  }
  
  // Transform the responsive props into prefixed classes
  const transformedClasses = transform(responsiveProps);
  
  // Remove responsive props from code and merge into className
  let result = code;
  
  // Remove each responsive prop
  result = result.replace(RESPONSIVE_PROP_PATTERN, '');
  
  // Add transformed classes to className
  // TODO: This is a simplified approach - needs refinement for:
  // - Multiple elements in one file
  // - Existing className merging
  // - Preserving other props
  
  if (result.includes('className=')) {
    // Merge with existing className
    result = result.replace(
      /className=(?:"([^"]*)"|'([^']*)')/,
      (match, doubleQuoted, singleQuoted) => {
        const existing = doubleQuoted || singleQuoted;
        return `className="${existing} ${transformedClasses}"`;
      }
    );
  } else {
    // Add new className prop
    // This is simplified - proper implementation needs AST parsing
    result = result.replace(
      /(<\w+)(\s)/,
      `$1 className="${transformedClasses}"$2`
    );
  }
  
  return result;
}
