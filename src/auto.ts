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
 * ⚠️ IMPORTANT: This import must be the FIRST import in your application.
 * 
 * ⚠️ NOTE: This is a fallback approach with small runtime overhead.
 * For better performance, use the Vite/Webpack/Rollup plugin instead.
 */

import { patchReact } from './runtime';

// Auto-patch React.createElement on import
patchReact();
