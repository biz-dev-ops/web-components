import MarkdownIt, { Token } from "markdown-it";
import path from "path";

export function rewriteUrlRulerPlugin(md: MarkdownIt, options: { src: string }): void {
    const dirname = path.dirname(options.src);

    md.core.ruler.push("rewrite-url-ruler", (state) => {
        rewriteRelativeUrl(state.tokens, dirname);
    });
};

function rewriteRelativeUrl(tokens: Token[], dirname: string) {
    for (const token of tokens) {
        if (token.children) {
            rewriteRelativeUrl(token.children, dirname)
        }

        ["src", "href"].forEach(attr => {
            const url = token.attrGet(attr)!;
            if(!url) {
                return;
            }
            const newUrl = path.join(dirname, url);
            token.attrSet(attr, newUrl);
        });
    }
}