import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import webComponentLinkRule from "../../../src/markdown-viewer/webcomponent-link-rule";

test.describe("webComponentLinkRule", () => {
    test("should transform links with matching extensions", async ({ }) => {
        const md = new MarkdownIt();
        md.use(webComponentLinkRule, {
            mappings: [
                { extensions: [".custom"], componentTag: "custom-component" },
                { extensions: [".other"], componentTag: "other-component" },
            ],
        });

        const markdown = "[Custom Link](file.custom) and [Other Link](another.other)";
        const html = md.render(markdown);

        expect(html).toContain("<custom-component src=\"file.custom\">");
        expect(html).toContain("</custom-component>");
        expect(html).toContain("<other-component src=\"another.other\">");
        expect(html).toContain("</other-component>");
    });

    test("should not transform links without matching extensions", async ({ }) => {
        const md = new MarkdownIt();
        md.use(webComponentLinkRule, {
            mappings: [{ extensions: [".custom"], componentTag: "custom-component" }],
        });

        const markdown = "[Normal Link](https://example.com)";
        const html = md.render(markdown);

        expect(html).toContain("<a href=\"https://example.com\">Normal Link</a>"); // Default rendering
        expect(html).not.toContain("<custom-component");
    });

    test("should handle links with no mappings", async ({ }) => {
        const md = new MarkdownIt();
        md.use(webComponentLinkRule, { mappings: [] });

        const markdown = "[Normal Link](https://example.com)";
        const html = md.render(markdown);

        expect(html).toContain("<a href=\"https://example.com\">Normal Link</a>");
    });

    test("should handle multiple mappings", async ({ }) => {
        const md = new MarkdownIt();
        md.use(webComponentLinkRule, {
            mappings: [
                { extensions: [".custom"], componentTag: "custom-component" },
                { extensions: [".other"], componentTag: "other-component" },
                { extensions: [".test"], componentTag: "test-component" },
            ],
        });

        const markdown = "[Custom Link](file.custom), [Other Link](another.other), [Test Link](test.test)";
        const html = md.render(markdown);

        expect(html).toContain("<custom-component src=\"file.custom\">");
        expect(html).toContain("<other-component src=\"another.other\">");
        expect(html).toContain("<test-component src=\"test.test\">");
    });

    test("should handle complex markdown with mixed link types", async ({ }) => {
        const md = new MarkdownIt();
        md.use(webComponentLinkRule, {
            mappings: [
                { extensions: [".custom"], componentTag: "custom-component" },
            ],
        });

        const markdown = `# Title\n\n[Custom Link](file.custom) and [Normal Link](https://example.com)\n\n**Bold Text**`;
        const html = md.render(markdown);

        expect(html).toContain("<custom-component src=\"file.custom\">");
        expect(html).toContain("<a href=\"https://example.com\">Normal Link</a>");
        expect(html).toContain("<strong>Bold Text</strong>");
        expect(html).toContain("<h1>Title</h1>");
    });
});