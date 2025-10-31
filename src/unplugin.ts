import { createUnplugin } from 'unplugin';
import { parse } from '@babel/parser';
import traverseDefault from '@babel/traverse';
import generateDefault from '@babel/generator';
import * as t from '@babel/types';

// Handle both ESM and CJS exports
const traverse = traverseDefault.default || traverseDefault;
const generate = generateDefault.default || generateDefault;

/**
 * Breezy CSS unplugin - transforms responsive props at build time using AST
 * 
 * This plugin uses Babel to parse JSX/TSX and transform responsive props
 * (sm, md, lg, xl, xxl) into prefixed className strings.
 */
export default createUnplugin(() => ({
  name: 'breezy-css',
  enforce: 'pre',

  transform(code: string, id: string) {
    // Only process JSX/TSX files
    if (!/\.[jt]sx$/.test(id)) {
      return null;
    }

    // Quick check - does file contain responsive props?
    if (!/\s(sm|md|lg|xl|xxl)=/.test(code)) {
      return null;
    }

    try {
      return transformWithAST(code, id);
    } catch (error) {
      console.error(`[breezy-css] Transform error in ${id}:`, error);
      return null;
    }
  },
}));

/**
 * Transform JSX using Babel AST
 */
function transformWithAST(code: string, filename: string): { code: string; map?: any } | null {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
    sourceFilename: filename,
  });

  let hasTransformations = false;

  traverse(ast, {
    JSXOpeningElement(path) {
      const attributes = path.node.attributes;
      const responsiveProps: Record<string, string> = {};
      let classNameAttr: t.JSXAttribute | null = null;
      const otherAttributes: (t.JSXAttribute | t.JSXSpreadAttribute)[] = [];

      for (const attr of attributes) {
        if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name)) {
          const attrName = attr.name.name;

          if (['sm', 'md', 'lg', 'xl', 'xxl'].includes(attrName)) {
            const value = getAttributeValue(attr);
            if (value) {
              responsiveProps[attrName] = value;
              hasTransformations = true;
            }
          } else if (attrName === 'className') {
            classNameAttr = attr;
          } else {
            otherAttributes.push(attr);
          }
        } else {
          otherAttributes.push(attr);
        }
      }

      if (Object.keys(responsiveProps).length > 0) {
        const transformedClassName = buildClassName(
          classNameAttr ? getAttributeValue(classNameAttr) : '',
          responsiveProps
        );

        const newClassNameAttr = t.jsxAttribute(
          t.jsxIdentifier('className'),
          t.stringLiteral(transformedClassName)
        );

        path.node.attributes = [...otherAttributes, newClassNameAttr];
      }
    },
  });

  if (!hasTransformations) {
    return null;
  }

  const result = generate(ast, {
    retainLines: true,
    sourceMaps: true,
    sourceFileName: filename,
  }, code);

  return {
    code: result.code,
    map: result.map,
  };
}

/**
 * Extract string value from JSX attribute
 */
function getAttributeValue(attr: t.JSXAttribute): string | null {
  if (!attr.value) return null;

  if (t.isStringLiteral(attr.value)) {
    return attr.value.value;
  }

  if (t.isJSXExpressionContainer(attr.value)) {
    const expr = attr.value.expression;
    if (t.isStringLiteral(expr)) {
      return expr.value;
    }
    if (t.isTemplateLiteral(expr) && expr.quasis.length === 1) {
      return expr.quasis[0].value.raw;
    }
  }

  return null;
}

/**
 * Build final className from base + responsive props
 */
function buildClassName(baseClassName: string, responsiveProps: Record<string, string>): string {
  const classes: string[] = [];

  if (baseClassName) {
    classes.push(baseClassName);
  }

  const breakpointMap: Record<string, string> = {
    sm: 'sm:',
    md: 'md:',
    lg: 'lg:',
    xl: 'xl:',
    xxl: '2xl:',
  };

  for (const [breakpoint, classString] of Object.entries(responsiveProps)) {
    const prefix = breakpointMap[breakpoint];
    const prefixedClasses = classString
      .split(' ')
      .filter(Boolean)
      .map(cls => `${prefix}${cls}`)
      .join(' ');

    if (prefixedClasses) {
      classes.push(prefixedClasses);
    }
  }

  return classes.join(' ');
}
