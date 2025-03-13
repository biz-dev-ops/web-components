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

        const tabs = page.getByRole("tab");
        const panels = page.getByRole("tabpanel");

        await expect(page.locator("div.tabs")).toHaveCount(1);
        await expect(page.getByRole("tablist")).toHaveCount(1);
        await expect(tabs).toHaveCount(3);
        await expect(panels).toHaveCount(1);

        await expect(tabs.nth(0)).toHaveText("Tab 1");
        await expect(tabs.nth(1)).toHaveText("Tab 2");
        await expect(tabs.nth(2)).toHaveText("Tab 3");

        await expect(panels.nth(0)).toContainText("Content 1");
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

        const tabs = page.getByRole("tab");
        const panels = page.getByRole("tabpanel");

        await expect(page.locator("div.tabs")).toHaveCount(2);
        await expect(page.getByRole("tablist")).toHaveCount(2);
        await expect(tabs).toHaveCount(4);
        await expect(panels).toHaveCount(2);

        await expect(tabs.nth(0)).toHaveText("Tab 1");
        await expect(tabs.nth(1)).toHaveText("Tab 2");
        await expect(tabs.nth(2)).toHaveText("Tab A");
        await expect(tabs.nth(3)).toHaveText("Tab B");

        await expect(panels.nth(0)).toContainText("Content 1");
        await expect(panels.nth(1)).toContainText("Content A");
    });

    test("should handle links", async ({ page }) => {
        const markdown = `- [Link](#link)`;

        render(md, page, markdown);

        const tabs = page.getByRole("tab");
        const panels = page.getByRole("tabpanel");

        await expect(page.locator("div.tabs")).toHaveCount(1);
        await expect(page.getByRole("tablist")).toHaveCount(1);
        await expect(tabs).toHaveCount(1);
        await expect(panels).toHaveCount(1);

        await expect(tabs.nth(0)).toHaveText("Link");;

        await expect(panels.nth(0).locator("a")).toHaveAttribute("href", "#link");
    });

    test("should not interfere with regular bullet lists", async ({ page }) => {
        const markdown = `- Item 1
- Item 2
`;

        const html = md.render(markdown);
        await page.setContent(html);

        await expect(page.locator("div.tabs")).toHaveCount(0);
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