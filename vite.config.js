import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { globSync } from "glob";

const inputs = globSync("src/**/*.ts");
console.log(inputs);


/** @type {import("vite").UserConfig} */
export default defineConfig({
	plugins: [
		nodePolyfills(),
	],
	build: {
		outDir: "../dist",
		minify: "terser",
		rollupOptions: {
			input: inputs,
			output: {
				entryFileNames: "web-components.js",
			}
		}
	},
	root: "src",
	publicDir: "../public",
});
