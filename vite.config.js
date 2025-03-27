import { defineConfig } from "vite"
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { globSync } from "glob";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
	plugins: [
		nodePolyfills({ globals: { Buffer: true } }),
		{
			name: "inline-fonts",
			enforce: "pre",
			transform: async (code, id) => {
				if (id.endsWith(".css?inline")) {
					const basePath = path.dirname(id);
					const css = inlineFontUrls(code, basePath);

					return {
						code: css,
						map: null, // No source map transformations
					};
				}
			},
		}, {
			name: "serve-theme-css",
			configureServer(server) {
				server.middlewares.use((req, res, next) => {
					if (req.url === "/theme.css") {
						const themePath = path.resolve(__dirname, "src/theme.css");
						try {
							const content = fs.readFileSync(themePath, "utf-8");
							res.setHeader("Content-Type", "text/css");
							res.end(content);
						}
						catch (error) {
							console.error("Error serving theme.css:", error);
							next(error);
						}
					}
					else {
						next();
					}
				});
			}
		}
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
	publicDir: "../public"
});


function inlineFontUrls(cssString, baseDirectory) {
	const fontUrlRegex = /src: url\(['"]?(.*?\.(woff2?|ttf|otf))['"]?\)\s+format\(['"]?(.*?)['"]?\)/g;
	let match;
	let modifiedCss = cssString;

	while ((match = fontUrlRegex.exec(cssString)) !== null) {
		const originalUrl = match[1];
		const format = match[3].toLowerCase(); // e.g., "woff2"
		if (originalUrl.startsWith('data:')) {
			continue; // Skip already base64 encoded URLs
		}

		const resolvedFontPath = path.resolve(baseDirectory, originalUrl);

		try {
			const fileBuffer = fs.readFileSync(resolvedFontPath);
			const base64Data = fileBuffer.toString('base64');
			const mimeType = getMimeTypeFromFormat(format);
			const dataUrl = `src: url(data:${mimeType};base64,${base64Data}) format('${format}')`;
			modifiedCss = modifiedCss.replace(match[0], dataUrl);

			console.info(`\nFont ${resolvedFontPath} inlined`);
		} catch (error) {
			console.error(`Error inlining font ${resolvedFontPath}:`, error);
		}
	}

	return modifiedCss;
}

function getMimeTypeFromFormat(format) {
	switch (format) {
		case 'woff':
			return 'font/woff';
		case 'woff2':
			return 'font/woff2';
		case 'ttf':
			return 'font/ttf';
		case 'otf':
			return 'font/otf';
		default:
			return 'application/octet-stream';
	}
}
