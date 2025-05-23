import MarkdownIt, { Options, Renderer, Token } from "markdown-it";
import { nestedHeadersRulerPlugin } from "../nested-headers-ruler";

export interface nestedHeadersRulePluginOptions {
    isAriaExpanded?: (level: number) => boolean | undefined;
}

export function nestedHeadersRulePlugin(md: MarkdownIt, options?: nestedHeadersRulePluginOptions): void {
    const isAriaExpanded = options?.isAriaExpanded || ((_level: number) => undefined);

    md.use(nestedHeadersRulerPlugin);

    md.renderer.rules.heading_container_open = function (tokens: Token[], idx: number): string {
        const level = Number.parseInt(tokens[idx].attrGet("data-heading-level")!);
        const ariaExpanded = isAriaExpanded(level);

        return `<bdo-heading-container${ariaExpanded === undefined ? "" : ` aria-expanded="${ariaExpanded}"`}>`;
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