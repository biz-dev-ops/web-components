import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { globSync } from "glob";

export default defineConfig({
	plugins: [
		nodePolyfills(),
	],
	build: {
		outDir: "../dist",
		minify: "terser",
		rollupOptions: {
			input: globSync("src/**/*.ts"),
			output: {
				entryFileNames: "web-components.js",
			}
		}
	},
	root: "src",
	publicDir: "../public",
});
