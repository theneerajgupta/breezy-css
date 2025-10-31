import { ResponsiveProps, BREAKPOINT_MAP, Breakpoint } from './types';

// here we precomplie regex to see if a string contains responsive props
// this is done for early bailout optimization
// basically we check if we have responsive props available in the tag
// if we dont have it, we skip and move on

const HAS_RESPONSIVE_PROPS = /\s(sm|md|lg|xl|xxl)=/;

// now we create the transform function
// this function will convert responsive props into single className string

export function transform(props: ResponsiveProps): string {
	
	const classes: string[] = [];

	// start with base classname if exists
	if (props.className) {
		classes.push(props.className);
	}

	// Process each responsive prop
	const breakpoints: Breakpoint[] = ['sm', 'md', 'lg', 'xl', 'xxl'];

	for (const breakpoint of breakpoints) {

		const value = props[breakpoint]

		if (value) {

			// get tailwind prefix
			const prefix = BREAKPOINT_MAP[breakpoint]

			const prefixedClasses = value
				.split(' ')
				.filter(Boolean)
				.map(cls => `${prefix}${cls}`)
				.join(' ');

			if (prefixedClasses) {

				classes.push(prefixedClasses)

			}

		}

	}

	return classes.join(' ');

}


// quick check to see if code has responsive props
// used by unplugin for early bailout

export function hasResponsiveProps (code: string): boolean {

	return HAS_RESPONSIVE_PROPS.test(code);

}


