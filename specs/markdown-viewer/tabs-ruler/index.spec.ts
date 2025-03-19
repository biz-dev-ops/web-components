import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import tabsRulerPlugin from "../../../src/markdown-viewer/tabs-ruler/";

test.describe("tabsRuler", () => {

  test("should add tabs properties to lists and list items with matching extensions", async ({ }) => {
    const md = new MarkdownIt();
    md.use(tabsRulerPlugin, { extensions: [".bpmn"] });

    const markdown = "- [Process 1](process1.bpmn)\n- [Process 2](process2.bpmn)\n- Normal item\n";

    const tokens = md.parse(markdown, null);

    const bulletListTokens = findTokensByTypePrefix(tokens, "bullet_list");
    const listItemList = findTokensByTypePrefix(tokens, "list_item");

    checkProperty("tabs", bulletListTokens, [0, 1]);
    checkProperty("tab", listItemList, [0, 1, 2, 3, 4, 5]);
  });

  test("should not add tabs properties when no matching extensions are found", async ({ }) => {
    const md = new MarkdownIt();
    md.use(tabsRulerPlugin, { extensions: [".bpmn"] });

    const markdown = "- [Normal Link](https://example.com)\n- Another normal item\n";

    const tokens = md.parse(markdown, null);

    const bulletListTokens = findTokensByTypePrefix(tokens, "bullet_list");
    const listItemList = findTokensByTypePrefix(tokens, "list_item");

    checkProperty("tabs", bulletListTokens, []);
    checkProperty("tab", listItemList, []);
  });

  test("should handle multiple extensions", async ({ }) => {
    const md = new MarkdownIt();
    md.use(tabsRulerPlugin, { extensions: [".bpmn", ".custom"] });

    const markdown = "- [Process 1](process1.bpmn)\n- [Custom File](custom.custom)\n- Normal item\n";

    const tokens = md.parse(markdown, null);

    const bulletListTokens = findTokensByTypePrefix(tokens, "bullet_list");
    const listItemList = findTokensByTypePrefix(tokens, "list_item");

    checkProperty("tabs", bulletListTokens, [0, 1]);
    checkProperty("tab", listItemList, [0, 1, 2, 3, 4, 5]);
  });

  test("should handle multiple lists", async ({ }) => {
    const md = new MarkdownIt();
    md.use(tabsRulerPlugin, { extensions: [".bpmn", ".custom"] });

    const markdown = "- [Process 1](process1.bpmn)\n- [Custom File](custom.custom)\n- Normal item\n\n" +
      "new line\n\n" +
      "- Normal item\n\n" +
      "new line\n\n" +
      "- [Process 1](process1.bpmn)\n- [Custom File](custom.custom)\n- Normal item\n";

    const tokens = md.parse(markdown, null);

    const bulletListTokens = findTokensByTypePrefix(tokens, "bullet_list");
    const listItemList = findTokensByTypePrefix(tokens, "list_item");

    checkProperty("tabs", bulletListTokens, [0, 1, 4, 5]);
    checkProperty("tab", listItemList, [0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13]);
  });
});


function findTokensByTypePrefix(tokens: any[], typePrefix: string): any[] {
  const result: any[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type.startsWith(typePrefix)) {
      result.push(token);
    }
  }

  return result;
}

function checkProperty(property: string, tokens: any[], expectedIndexes: number[]) {
  const expectedTotal = expectedIndexes.length;
  const actualTotal = tokens.filter((token) => token[property] === true).length;

  expect(actualTotal).toBe(expectedTotal);

  expectedIndexes.forEach((value) => {
    expect(tokens[value][property]).toBe(true);
  });
}