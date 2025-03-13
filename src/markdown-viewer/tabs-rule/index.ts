import MarkdownIt, { Options, Renderer, Token } from "markdown-it";

export default function tabsRule(md: MarkdownIt): void {
    let tabPanelIndex = 0;
    let tabContentIndex = 0;

    md.renderer.rules.bullet_list_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
        const token = tokens[idx];

        if (!(token as any).tabs) {
            return self.renderToken(tokens, idx, options);
        }

        tabPanelIndex += 1;
        tabContentIndex = 0;

        const headers = getHeaders(tokens, idx);

        return `
            <tab-panel>
                <tab-header-panel>
                    ${headers.map((header, index) => `<tab-header data-tab="tab-content-${tabPanelIndex}-${index + 1}">${header}</tab-header>`).join("")}
                </tab-header-panel>
                <tab-content-panel>
        `;
    }

    md.renderer.rules.list_item_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
        const token = tokens[idx];

        if (!(token as any).tab) {
            return self.renderToken(tokens, idx, options);
        }

        tabContentIndex += 1;

        return `
            <tab-content id="tab-content-${tabPanelIndex}-${tabContentIndex}">`;
    }

    md.renderer.rules.list_item_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
        const token = tokens[idx];

        if (!(token as any).tab) {
            return self.renderToken(tokens, idx, options);
        }

        return `
            </tab-content>`;
    }

    md.renderer.rules.bullet_list_close = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
        const token = tokens[idx];

        if (!(token as any).tabs) {
            return self.renderToken(tokens, idx, options);
        }

        return `
                </tab-content-panel>
            </tab-panel>
        `;
    }
}

function getHeaders(tokens: Token[], idx: number) : string[] {
    const headers: string[] = [];
    for(idx; idx < tokens.length; idx++) {
        const token = tokens[idx];

        if(tokens[idx].type=== "bullet_list_close") {
            break;
        }

        if(token.type != "list_item_open") {
            continue;
        }

        const inlineToken = getNextInline(tokens, idx);
        const textToken  = inlineToken?.children?.find(child => child.type === "text");
        headers.push(textToken?.content || "undefined");
    }
    return headers;
}

function getNextInline(tokens: Token[], idx: number) : Token | null {
    for(idx; idx < tokens.length; idx++) {
        const token = tokens[idx];
        if(token.type === "inline") {
            return token;
        }
    }
    return null;
}
