import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
const prefix = `monaco-editor/esm/vs`
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: [
      `${prefix}/language/typescript/ts.worker`,
      `${prefix}/editor/editor.worker`
    ]
  }
})
