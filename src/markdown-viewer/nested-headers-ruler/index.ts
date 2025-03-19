import MarkdownIt, { StateCore } from "markdown-it";
import Token from "markdown-it/lib/token.mjs";

export default function nestedHeadersRulerPlugin(md: MarkdownIt): void {
    md.core.ruler.push("nested_headers", nestedHeadersRuler);
}

export function nestedHeadersRuler(state: StateCore): void {
    const tokens: Token[] = [];
    const openContainerTokenStack: Token[] = [];

    for (const token of state.tokens) {
        if (token.type === "heading_open") {
            const headerLevel = parseInt(token.tag.slice(1));

            addCloseContainerTokenWhenOpenContainerTokensHeaderLevelIsGreaterOrEqual(headerLevel);

            addOpenContainerToken(token);
        }

        addTokenWithTheRightLevel(token);
    }

    while (openContainerTokenStack.length > 0) {
        const openContainer = openContainerTokenStack.pop()!;
        addCloseContainerToken(openContainer);
    }

    state.tokens = tokens;

    function addCloseContainerTokenWhenOpenContainerTokensHeaderLevelIsGreaterOrEqual(headerLevel: number) {
        for (let i = openContainerTokenStack.length - 1; i >= 0; i--) {
            const openContainer = openContainerTokenStack[i];
            const level = parseInt(openContainer.attrGet("data-heading-level")!);
            if (level >= headerLevel) {
                addCloseContainerToken(openContainer);
                openContainerTokenStack.splice(i, 1);
            }
            else {
                break;
            }
        }
    }

    function addTokenWithTheRightLevel(token: Token) {
        const containerLevel = getContainerLevel();
        const tokenLevel = (containerLevel + token.level) + 1;
        token.level = tokenLevel;
        tokens.push(token);
    }

    function getContainerLevel(): number {
        if(openContainerTokenStack.length == 0) {
            return -1;
        }

        return openContainerTokenStack[openContainerTokenStack.length - 1].level;
    }

    function addOpenContainerToken(headingOpenToken: Token) {
        const openContainerToken = new Token("heading_container_open", "div", 1);
        openContainerToken.level = getContainerLevel() + 1;
        openContainerToken.map = headingOpenToken.map;
        openContainerToken.attrPush(["data-heading-level", headingOpenToken.tag.slice(1)]);
        tokens.push(openContainerToken);
        openContainerTokenStack.push(openContainerToken);
    }

    function addCloseContainerToken(openContainerToken: Token) {
        const closeContainerToken = new Token("heading_container_close", "div", -1);
        closeContainerToken.level = openContainerToken.level;
        closeContainerToken.map = openContainerToken.map;
        const headingLevel = openContainerToken.attrGet("data-heading-level");
        if(headingLevel) {
            closeContainerToken.attrPush(["data-heading-level", headingLevel]);
        }
        tokens.push(closeContainerToken);
    }
}