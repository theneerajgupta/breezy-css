/**
 * Breezy CSS - Runtime Auto-Patch
 * 
 * Import this file once at the top of your application entry point
 * to automatically enable responsive props on all React elements.
 * 
 * @example
 * ```ts
 * // src/main.tsx or src/index.tsx
 * import 'breezy-css/auto';  // Must be first import!
 * import React from 'react';
 * import ReactDOM from 'react-dom/client';
 * import App from './App';
 * 
 * ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
 * ```
 * 
 * ⚠️ IMPORTANT: This import must be the FIRST import in your application,
 * before any React components are imported.
 * 
 * If you're using a bundler (Vite, Webpack, etc.), prefer the plugin approach
 * for better performance (zero runtime overhead).
 */

import { patchReact } from './runtime';

// Auto-patch React.createElement on import
patchReact();

// For debugging: log that breezy-css runtime is active
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('[breezy-css] Runtime mode active');
}
