import MarkdownIt, { Options, Renderer, Token } from "markdown-it";
import nestedHeadersRulerPlugin from "../nested-headers-ruler";

export default function nestedHeadersRulePlugin(md: MarkdownIt): void {
    md.use(nestedHeadersRulerPlugin);

    md.renderer.rules.heading_container_open = function (_tokens: Token[], _idx: number): string {
        return `<bdo-heading-container>`;
    }

    md.renderer.rules.heading_open = function (tokens: Token[], idx: number, options: Options, _env: any, self: Renderer): string {
        const token = tokens[idx];
        token.attrSet("slot", "header");
        return self.renderToken(tokens, idx, options);
    }

    md.renderer.rules.heading_container_close = function (): string {
        return `</bdo-heading-container>`;
    }
}