// Responsive prop names that map to Tailwindcss Breakpoints
// sm -> sm
// md -> md
// lg -> lg
// xl -> xl
// xxl -> 2xl

export interface ResponsiveProps {
	className?: string;
	sm?: string;
	md?: string;
	lg?: string;
	xl?: string;
	xxl?: string;
};

// Mapping prop names to their respective tailwind prefixes

export const BREAKPOINT_MAP = {
	sm: 'sm:',
	md: 'md:',
	lg: 'lg:',
	xl: 'xl:',
	xxl: '2xl',
} as const;

// Export valid breakpoint names

export type Breakpoint = keyof typeof BREAKPOINT_MAP

