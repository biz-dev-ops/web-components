import MarkdownIt, { StateCore, Token } from "markdown-it";

export default function WebComponentsDriverRulerPlugin(md: MarkdownIt): void {

    md.core.ruler.push("web-components-driver-ruler", (state) => {
        let tokens = state.tokens;
        let newTokens: Token[] = [];
        let tokenId = 0;
        let replacingTokens = false;

        while (tokenId < tokens.length) {
            const token = tokens[tokenId];

            if (replacingTokens) {
                if (token.type === "link_close") {
                    replacingTokens = false;
                }

                tokenId++;
                continue;
            }
            if (token.type !== "link_open") {
                newTokens.push(token);
                tokenId++;
                continue;
            }

            const newToken = parseToken(token, state);
            if(newToken) {
                replacingTokens = true;
                newTokens.push(newToken);
            }
            else {
                newTokens.push(token);
            }

            tokenId++;
        }

        state.tokens = newTokens;
    });
};

const componentActions = [
    { tag: "bpmn-viewer", actions: ["toggle-fullscreen", "zoom-in", "zoom-out", "zoom-reset"] },
    { tag: "business-model-canvas", actions: ["toggle-fullscreen"] },
    { tag: "business-reference-architecture", actions: ["toggle-fullscreen"] },
    { tag: "command-viewer", actions: ["toggle-fullscreen", "zoom-in"] },
    { tag: "dmn-viewer", actions: ["toggle-fullscreen"] },
    { tag: "event-viewer", actions: ["toggle-fullscreen"] },
    { tag: "feature-viewer", actions: ["toggle-fullscreen"] },
    { tag: "mermaid-viewer", actions: ["toggle-fullscreen"] },
    { tag: "model-viewer", actions: ["toggle-fullscreen"] },
    { tag: "query-viewer", actions: ["toggle-fullscreen"] },
    { tag: "task-viewer", actions: ["toggle-fullscreen"] }
];

const componentIcons = {
    "toggle-fullscreen": "mat-fullscreen",
    "zoom-in": "mat-zoom_in",
    "zoom-out": "mat-zoom_out",
    "zoom-reset": "mat-reset_focus"
};

function parseToken(token: Token, state: StateCore) {
    const tag = token.tag;
    if(!tag) {
        return null;
    }

    const src = token.attrGet("src");
    const actions = componentActions.find(a => a.tag === tag)?.actions;

    if(!actions) {
        return null;
    }

    const htmlActions = actions.map(action => {
        return `
            <bdo-button slot="driver" data-action="${action}" title="${action}">
                <bdo-icon icon="${componentIcons[action]}"></bdo-icon>
            </bdo-button>
        `;
    });

    const html = `
        <bdo-driver>
            ${htmlActions.join("\n")}
            <${tag} src="${src}"></${tag}>
        </bdo-driver>
    `;

    const htmlBlockToken = new state.Token("html_block", "", 0);
    htmlBlockToken.content = html;
    htmlBlockToken.block = true;

    return htmlBlockToken;
}