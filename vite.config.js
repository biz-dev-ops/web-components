import {defineConfig} from 'vite'
import {nodePolyfills} from "vite-plugin-node-polyfills";

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [
		nodePolyfills({
			globals: {
				process: true,
				Buffer: true,
				global: true
			}
					  }),
	],
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
