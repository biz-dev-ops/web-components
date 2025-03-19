import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import nestedHeadersRule from "../../../src/markdown-viewer/nested-headers-rule"

test.describe("nestedHeadersRule", () => {

    test("should handle single header", () => {
        const markdown = "# Single Header";

        const expectedHtml = `
<bdo-heading-container heading-level="1">
    <h1 slot="header">Single Header</h1>
</bdo-heading-container>`

        expectMarkdownToRenderAs(markdown, expectedHtml);
    });

    test("should render heading containers and adjust heading tokens", () => {
        const markdown = `
# Level 1

Level 1 content

## Level 2

Level 2 content

### Level 3

Level 3 content
`;

        const expectedHtml = `
<bdo-heading-container heading-level="1">
    <h1 slot="header">Level 1</h1>
    <p>
        Level 1 content
    </p>
    <bdo-heading-container heading-level="2">
        <h2 slot="header">Level 2</h2>
        <p>
            Level 2 content
        </p>
        <bdo-heading-container heading-level="3">
            <h3 slot="header">Level 3</h3>
            <p>
                Level 3 content
            </p>
        </bdo-heading-container>
    </bdo-heading-container>
</bdo-heading-container>`

        expectMarkdownToRenderAs(markdown, expectedHtml);
    });

    test("should handle no headers", () => {
        const markdown = "Some plain text.";

        const expectedHtml = `
<p>Some plain text.</p>
`;

        expectMarkdownToRenderAs(markdown, expectedHtml);
    });
});

function renderMarkdown(markdown: string) {
    const md = new MarkdownIt();
    md.use(nestedHeadersRule);
    return md.render(markdown).trim();
}
function expectMarkdownToRenderAs(markdown: string, expectedHtml: string) {
    const md = new MarkdownIt();
    md.use(nestedHeadersRule);
    const html = md.render(markdown);
    expect(trimHtml(html)).toBe(trimHtml(expectedHtml));
}

function trimHtml(html: string) : string {
    return html.split("\n").map(l => l.trim()).join("");
}

