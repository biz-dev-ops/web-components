import MarkdownIt, { StateCore, Token } from "markdown-it";

interface LinkTransFormRulerOptions {
    extensions?: string[];
}

export default function linkTransformRuler(md: MarkdownIt, options?: LinkTransFormRulerOptions): void {
    const extensions: string[] = options?.extensions || [];

    md.core.ruler.push("links_transform_ruler", (state: StateCore): void => {
        const newTokens: Token[] = [];
        const tokens = state.tokens;
        let removeEmptyParagraph = false;

        for (let tokenIdx = 0; tokenIdx < tokens.length; tokenIdx++) {
            const token = tokens[tokenIdx];

            if (token.type === "inline" && token.children) {
                let inline = true;
                const newChildren: Token[] = [];

                for (let childIdx = 0; childIdx < token.children.length; childIdx++) {
                    const child = token.children[childIdx];

                    if (child.type === "link_open") {
                        const href = child.attrGet("href")?.split("?")[0].split("#")[0];

                        if (extensions.some((ext) => href?.endsWith(ext))) {
                            inline = false;
                            removeEmptyParagraph = true;
                        }
                    }

                    if (inline) {
                        newChildren.push(child);
                    }
                    else {
                        child.level = token.level;
                        newTokens.splice(newTokens.length - 1, 0, child)
                    }

                    if (child.type === "link_close") {
                        inline = true;
                    }
                }

                token.children = newChildren;

                if (token.children.length > 0) {
                    newTokens.push(token);
                }
            }
            else if (token.type === "paragraph_close") {
                if(removeEmptyParagraph && newTokens[newTokens.length - 1].type === "paragraph_open") {
                    newTokens.splice(newTokens.length - 1);
                }
                else {
                    newTokens.push(token);
                }
                removeEmptyParagraph = false;
            }
            else {
                newTokens.push(token);
            }
        }

        state.tokens = newTokens;
    });
}