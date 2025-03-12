import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { globSync } from "glob";

export default defineConfig({
	plugins: [
		nodePolyfills({ globals: { Buffer: true } }),
	],
	build: {
		outDir: "../dist",
		minify: "terser",
		rollupOptions: {
			input: globSync("src/*/index.ts"),
			output: {
				entryFileNames: "web-components.js",
			}
		}
	},
	root: "specs",
	publicDir: "../public",
});
