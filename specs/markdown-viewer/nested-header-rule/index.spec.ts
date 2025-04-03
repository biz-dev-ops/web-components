import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import nestedHeadersRulePlugin from "../../../src/markdown-viewer/nested-headers-rule"
import { expectMarkdownToMatchHtml } from "../markdown-test-util";

test.describe("nestedHeadersRulePlugin", () => {

    test("should handle single header", () => {
        const markdown = "# Single Header";

        const expectedHtml = `
<bdo-heading-container>
    <h1 slot="header">Single Header</h1>
</bdo-heading-container>`

        expectHtml(markdown, expectedHtml);
    });

    test("should render heading containers", () => {
        const markdown = `
# Level 1

Level 1 content

## Level 2

Level 2 content

### Level 3

Level 3 content
`;

        const expectedHtml = `
<bdo-heading-container>
    <h1 slot="header">Level 1</h1>
    <p>
        Level 1 content
    </p>
    <bdo-heading-container>
        <h2 slot="header">Level 2</h2>
        <p>
            Level 2 content
        </p>
        <bdo-heading-container>
            <h3 slot="header">Level 3</h3>
            <p>
                Level 3 content
            </p>
        </bdo-heading-container>
    </bdo-heading-container>
</bdo-heading-container>`

        expectHtml(markdown, expectedHtml);
    });

    test("should render heading containers and set aria-expanded", () => {
        const markdown = `
# Level 1

Level 1 content

## Level 2

Level 2 content

### Level 3

Level 3 content
`;

        const expectedHtml = `
<bdo-heading-container>
    <h1 slot="header">Level 1</h1>
    <p>
        Level 1 content
    </p>
    <bdo-heading-container aria-expanded="true">
        <h2 slot="header">Level 2</h2>
        <p>
            Level 2 content
        </p>
        <bdo-heading-container aria-expanded="false">
            <h3 slot="header">Level 3</h3>
            <p>
                Level 3 content
            </p>
        </bdo-heading-container>
    </bdo-heading-container>
</bdo-heading-container>`

        expectHtml(markdown, expectedHtml, (level: number) => {
            switch(level) {
                case 2:
                    return true;
                case 3:
                    return false;
                default:
                    return undefined;
            }
        });
    });

    test("should handle no headers", () => {
        const markdown = "Some plain text.";

        const expectedHtml = `
<p>Some plain text.</p>
`;
        expectHtml(markdown, expectedHtml);
    });
});

function expectHtml(markdown: string, expectedHtml: string, isAriaExpanded?: (level: number) => boolean | undefined) {
    const md = new MarkdownIt();
    md.use(nestedHeadersRulePlugin, { isAriaExpanded });
    expectMarkdownToMatchHtml(md, markdown, expectedHtml);
}

