import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import tabsRule from "../../../src/markdown-viewer/tabs-rule/";
import Token from "markdown-it/lib/token.mjs";

test.describe("tabsRule Plugin", () => {
  test("should transform bullet lists with tabs attribute to my-tabs component", async () => {
    const md = new MarkdownIt();
    md.use(tabsRule);

    const markdown = `- Tab 1
  Content 1
- Tab 2
  Content 2
`;
    const tokens = setTabs(md.parse(markdown, {}));
    const result = md.renderer.render(tokens, md.options, {});

    expect(result).toContain(`<my-tabs selectedIndex="0">`);
    expect(result).toContain(`<my-tab title="Tab 1">`);
    expect(result).toContain("Content 1");
    expect(result).toContain(`<my-tab title="Tab 2">`);
    expect(result).toContain("Content 2");
    expect(result).toContain(`</my-tabs>`);
  });

  test("should use link names as tab title", async () => {
    const md = new MarkdownIt();
    md.use(tabsRule);

    const markdown = `- [Tab 1](#test)
- Tab 2
  Content 2
`;
    const tokens = setTabs(md.parse(markdown, {}));
    const result = md.renderer.render(tokens, md.options, {});

    expect(result).toContain(`<my-tabs selectedIndex="0">`);
    expect(result).toContain(`<my-tab title="Tab 1">`);
    expect(result).toContain(`<a href="#test">Tab 1</a>`);
    expect(result).toContain(`<my-tab title="Tab 2">`);
    expect(result).toContain("Content 2");
    expect(result).toContain(`</my-tabs>`);
  });
});

function setTabs(tokens: Token[]): Token[] {
  for(const token of tokens) {
    if(token.type.startsWith("bullet_list")) {
      token["tabs"] = true;
    }

    if(token.type.startsWith("list_item")) {
      token["tab"] = true;
    }
  }
  return tokens;
}
