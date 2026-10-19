import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite is the build tool/dev server (what `npm run dev` actually starts).
// The react plugin teaches Vite how to understand JSX syntax and enables
// fast refresh (your browser updates instantly when you save a file).
// You generally won't need to touch this file for a site like this one.
export default defineConfig({
  plugins: [react()],
})
