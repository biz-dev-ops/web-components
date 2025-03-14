import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import linkTransformRule, { Link, TransformResultOrNull } from "../../../src/markdown-viewer/link-transform-rule";

test.describe("linkTransformRule", () => {
    test("should transform links with matching extensions", async ({ }) => {
        const markdown = "[Custom Link](file.custom) and [Other Link](another.other)";
        const html = render(markdown);

        expect(html).toContain(`<custom-component text="Custom Link">`);
        expect(html).toContain("</custom-component>");
        expect(html).toContain(`<other-component text="Other Link">`);
        expect(html).toContain("</other-component>");
    });

    test("should use default renderer for links when transformer returns null", async ({ }) => {
        const markdown = "[Normal Link](https://example.com)";
        const html = render(markdown);

        expect(html).toContain("<a href=\"https://example.com\">Normal Link</a>");
    });

    test("should handle multiple mappings", async ({ }) => {
        const markdown = "[Custom Link](file.custom), [Other Link](another.other), [Test Link](test.test)";
        const html = render(markdown);

        expect(html).toContain(`<custom-component text="Custom Link">`);
        expect(html).toContain("</custom-component>");
        expect(html).toContain(`<other-component text="Other Link">`);
        expect(html).toContain("</other-component>");
        expect(html).toContain(`<test-component text="Test Link">`);
        expect(html).toContain("</test-component>");
    });

    test("should handle complex markdown with mixed link types", async ({ }) => {
        const markdown = `# Title\n\n[Custom Link](file.custom) and [Normal Link](https://example.com)\n\n**Bold Text**`;
        const html = render(markdown);

        expect(html).toContain(`<custom-component text="Custom Link">`);
        expect(html).toContain("</custom-component>");
        expect(html).toContain("<a href=\"https://example.com\">Normal Link</a>");
        expect(html).toContain("<strong>Bold Text</strong>");
        expect(html).toContain("<h1>Title</h1>");
    });
});

function render(markdown: string) : string {
    const  md = new MarkdownIt();
    md.use(linkTransformRule, { transformer: transformer });
    return md.render(markdown);
}

function transformer(link: Link) : TransformResultOrNull {
    const href = link.getAttribute("href");
    const text = link.getText();
    let tag: string | null = null;

    if(href === "file.custom") {
        tag = "custom-component";
    }
    else if(href === "another.other") {
        tag = "other-component";
    }
    else if(href === "test.test") {
        tag = "test-component";
    }

    if(!tag) {
        return null;
    }

    return {
        open: `<${tag} text="${text}">`,
        close: `</${tag}>`,
    }
}