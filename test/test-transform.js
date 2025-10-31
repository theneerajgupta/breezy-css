// Quick test of our transformation logic
// We'll use .js instead of .ts to avoid needing TypeScript compilation

const BREAKPOINT_MAP = {
  sm: 'sm:',
  md: 'md:',
  lg: 'lg:',
  xl: 'xl:',
  xxl: '2xl:',
};

function transform(props) {
  const classes = [];
  
  if (props.className) {
    classes.push(props.className);
  }
  
  const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'];
  
  for (const breakpoint of breakpoints) {
    const value = props[breakpoint];
    if (value) {
      const prefix = BREAKPOINT_MAP[breakpoint];
      const prefixedClasses = value
        .split(' ')
        .filter(Boolean)
        .map(cls => `${prefix}${cls}`)
        .join(' ');
      
      if (prefixedClasses) {
        classes.push(prefixedClasses);
      }
    }
  }
  
  return classes.join(' ');
}

// Test cases
console.log('Test 1 - Basic:');
console.log(transform({ className: 'flex gap-2', md: 'flex-col' }));
console.log('Expected: flex gap-2 md:flex-col\n');

console.log('Test 2 - Multiple breakpoints:');
console.log(transform({ className: 'p-4', sm: 'p-6', lg: 'p-8', xxl: 'p-12' }));
console.log('Expected: p-4 sm:p-6 lg:p-8 2xl:p-12\n');

console.log('Test 3 - Multiple classes per breakpoint:');
console.log(transform({ className: 'flex', md: 'flex-col gap-4 p-6' }));
console.log('Expected: flex md:flex-col md:gap-4 md:p-6\n');

console.log('Test 4 - No base className:');
console.log(transform({ md: 'hidden', lg: 'block' }));
console.log('Expected: md:hidden lg:block');
