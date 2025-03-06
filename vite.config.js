import {defineConfig} from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    outDir: '../dist',
	  minify: 'terser',
	  rollupOptions: {
		  input: './src/index.ts',
		  output: {
			  entryFileNames: 'web-components.js',
		  }
	  }
  },
  root: 'src',
  publicDir: '../public',
})
