import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import tabsRulerPlugin, { ListItem } from "../../../src/markdown-viewer/tabs-ruler/";
import { expectMarkdownToMatchTokens } from "../markdown-test-util";
import { Token } from "markdown-it/index.js";

test.describe("tabsRuler", () => {

  test("should add tabs properties to lists and list items when list item is a tab panel", async ({ }) => {
    const markdown = "- [Process 1](process1.bpmn)\n- [Process 2](process2.bpmn)\n- Normal item\n";
    const expectedTokens = [
      { type: "bullet_list_open", tabs: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "bullet_list_close", tabs: true },
    ] as Token[];

    expectTokens(markdown, expectedTokens);
  });

  test("should not add tabs properties when list item is not a tab panel", async ({ }) => {
    const markdown = "- [Process 1](process1.bpmn)\n- [Process 2](process2.bpmn)\n- Normal item\n";
    const expectedTokens = [
      { type: "bullet_list_open", tabs: undefined },
      { type: "list_item_open", tab: undefined },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: undefined },
      { type: "list_item_open", tab: undefined },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: undefined },
      { type: "list_item_open", tab: undefined },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: undefined },
      { type: "bullet_list_close", tabs: undefined },
    ] as Token[];

    expectTokens(markdown, expectedTokens, (listItem: ListItem) => false);
  });

  test("should handle multiple lists", async ({ }) => {
    const markdown = "- [Process 1](process1.bpmn)\n- [Custom File](custom.custom)\n- Normal item\n\n" +
      "new line\n\n" +
      "- Normal item\n\n" +
      "new line\n\n" +
      "- [Process 1](process1.bpmn)\n- [Custom File](custom.custom)\n- Normal item\n";

    const expectedTokens = [
      { type: "bullet_list_open", tabs: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "bullet_list_close", tabs: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "bullet_list_open", tabs: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "bullet_list_close", tabs: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "bullet_list_open", tabs: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "bullet_list_close", tabs: true },
    ] as Token[];

    expectTokens(markdown, expectedTokens);
  });

  test("should add tabs properties to lists and list items when href link ends with .bpmn", async ({ }) => {
    const markdown = "- [Process 1](process1.bpmn)\n- [Process 2](process2.bpmn)\n- Normal item\n";
    const expectedTokens = [
      { type: "bullet_list_open", tabs: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "list_item_open", tab: true },
      { type: "paragraph_open" },
      { type: "inline" },
      { type: "paragraph_close" },
      { type: "list_item_close", tab: true },
      { type: "bullet_list_close", tabs: true },
    ] as Token[];

    expectTokens(markdown, expectedTokens, (listItem: ListItem) => {
      return listItem.getLink()?.getPath()?.endsWith(".bpmn") || false
    });
  });
});

function expectTokens(markdown: string, expectedTokens: Token[], listItemIsTabPanel?: ((listItem: ListItem) => boolean)) {
  const md = new MarkdownIt();
  md.use(tabsRulerPlugin, {
    listItemIsTabPanel: listItemIsTabPanel || ((listItem: ListItem) => true)
  });
  expectMarkdownToMatchTokens(md, markdown, expectedTokens);
}
