import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import tabsRule from "../../../src/markdown-viewer/tabs-rule";

test.describe("tabsRule", () => {
    let md: MarkdownIt;

    test.beforeEach(() => {
        md = new MarkdownIt();
        md.use(tabsRule);
    });

    test("should render basic tabs", async ({ page }) => {
        const markdown = `- Tab 1
  Content 1
- Tab 2
  Content 2
- Tab 3
  Content 3
`;

        render(md, page, markdown);

        await expect(page.locator("tab-panel")).toHaveCount(1);
        await expect(page.locator("tab-header")).toHaveCount(3);
        await expect(page.locator("tab-content")).toHaveCount(3);

        await expect(page.locator(`tab-header[data-tab="tab-content-1-1"]`)).toHaveText("Tab 1");
        await expect(page.locator(`tab-content#tab-content-1-1`)).toContainText("Content 1");

        await expect(page.locator(`tab-header[data-tab="tab-content-1-2"]`)).toHaveText("Tab 2");
        await expect(page.locator("tab-content#tab-content-1-2")).toContainText("Content 2");

        await expect(page.locator(`tab-header[data-tab="tab-content-1-3"]`)).toHaveText("Tab 3");
        await expect(page.locator("tab-content#tab-content-1-3")).toContainText("Content 3");
    });

    test("should handle multiple tab panels", async ({ page }) => {
        const markdown = `- Tab 1
  Content 1
- Tab 2
  Content 2

new list

- Tab A
  Content A
- Tab B
  Content B
`;

        render(md, page, markdown);

        await expect(page.locator("tab-panel")).toHaveCount(2);
        await expect(page.locator("tab-header")).toHaveCount(4);
        await expect(page.locator("tab-content")).toHaveCount(4);

        await expect(page.locator(`tab-header[data-tab="tab-content-1-1"]`)).toHaveText("Tab 1");
        await expect(page.locator("tab-content#tab-content-1-1")).toContainText("Content 1");

        await expect(page.locator(`tab-header[data-tab="tab-content-2-1"]`)).toHaveText("Tab A");
        await expect(page.locator("tab-content#tab-content-2-1")).toContainText("Content A");
    });

    test("should handle links", async ({ page }) => {
        const markdown = `- [Link](#link)`;

        render(md, page, markdown);

        await expect(page.locator(`tab-header[data-tab="tab-content-1-1"]`)).toHaveText("Link");
        await expect(page.locator("tab-content#tab-content-1-1").locator("a")).toHaveAttribute("href", "#link");
    });

    test("should not interfere with regular bullet lists", async ({ page }) => {
        const markdown = `- Item 1
- Item 2
`;

        const html = md.render(markdown);
        await page.setContent(html);

        await expect(page.locator("ul")).toHaveCount(1);
        await expect(page.locator("li")).toHaveCount(2);
    });
});

async function render(md: any, page: any, markdown: string): Promise<any[]> {
    const tokens = md.parse(markdown, {});
    setTags(tokens);

    const html = md.renderer.render(tokens, md.options, {});

    await page.setContent(html);
    return tokens;
}


function setTags(tokens: any[]): void {
    tokens.forEach(token => {
        if (token.type.startsWith("bullet_list")) {
            (token as any).tabs = true;
        }

        if (token.type.startsWith("list_item")) {
            (token as any).tab = true;
        }
    });
}