import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import tabsRulePlugin from "../../../src/markdown-viewer/tabs-rule/";
import { expectMarkdownToMatchHtml } from "../markdown-test-util";
import { ListItem } from "../../../src/markdown-viewer/tabs-ruler";

test.describe("tabsRule Plugin", () => {

  test("should transform bullet lists with tabs attribute to bdo-tabs component", async () => {
    const markdown = `- Tab 1
  Content 1
- Tab 2
  Content 2
`;
    const expectedHtml = `<bdo-tabs selectedIndex="0">
    <bdo-tab title="Tab 1">
        Tab 1Content 1
    </bdo-tab>
    <bdo-tab title="Tab 2">
        Tab 2Content 2
    </bdo-tab>
</bdo-tabs>`;

    expectHtml(markdown, expectedHtml);
  });

  test("should use link names as tab title", async () => {
    const markdown = `- [Tab 1](#test)
- Tab 2
  Content 2
`;
    const expectedHtml = `<bdo-tabs selectedIndex="0">
    <bdo-tab title="Tab 1">
        <a href="#test">Tab 1</a>
    </bdo-tab>
    <bdo-tab title="Tab 2">
        Tab 2Content 2
    </bdo-tab>
</bdo-tabs>`;

    expectHtml(markdown, expectedHtml);
  });
});

function expectHtml(markdown: string, expectedHtml: string, listItemIsTabPanel?: (listItem: ListItem) => boolean) {
  const md = new MarkdownIt();
  md.use(tabsRulePlugin, {
    listItemIsTabPanel: listItemIsTabPanel || (() => true)
  });
  expectMarkdownToMatchHtml(md, markdown, expectedHtml);
}