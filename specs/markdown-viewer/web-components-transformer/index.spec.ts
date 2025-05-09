import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import { transformComponentLink, urlRewriterFactory, components } from "../../../src/markdown-viewer/web-components-transformer";
import linkTransformRulerPlugin from "../../../src/markdown-viewer/link-transform-ruler";
import { Token } from "markdown-it/dist/index.cjs.js";
import { expectMarkdownToMatchTokens } from "../markdown-test-util";

test.describe("webComponentsTransformer", () => {

  test("expect components to contain exactly tags", async () => {
    const expected = [
      "bpmn-viewer",
      "business-model-canvas",
      "business-reference-architecture",
      "command-viewer",
      "dmn-viewer",
      "event-viewer",
      "feature-viewer",
      "mermaid-viewer",
      "model-viewer",
      "query-viewer",
      "task-viewer"
    ].sort();
    const actual = [...new Set(components.map(c => c.tag))].sort();

    expect(actual).toEqual(expected);
  });

  components.forEach(({ extensions, tag }) => {
    extensions.forEach((extension) => {
      test(`should transform link with extension ${extension} to tag ${tag}`, async () => {
        const markdown = `[Test Link](example${extension})`;
        const expectedTokens = [
          { type: "link_open", tag: tag, block: true, attrs: [ [ "src", `test/example${extension}`] ] },
          { type: "text", content: "Test Link" },
          { type: "link_close", tag: tag, block: true, attrs: [ [ "src", `test/example${extension}`] ] }
        ] as unknown as Token[];

        expectTokens(markdown, expectedTokens);
      });
    });
  });

  test("should not transform link without matching extension", async () => {
    const markdown = "[Test Link](example.txt)";
    const expectedTokens = [
      { type: "paragraph_open" },
      {
        type: "inline",
        children: [
          { type: "link_open", tag: "a" },
          { type: "text" },
          { type: "link_close", tag: "a" }
        ] as unknown as Token[]
      },
      { type: "paragraph_close" }
    ] as unknown as Token[];

    expectTokens(markdown, expectedTokens);
  });

  components.forEach(({ extensions, tag }) => {
    extensions.forEach((extension) => {
      ["?query=1", "#hash", "?query=1#hash"].forEach(parameters => {
        test(`should transform link with extension ${extension} to tag ${tag} with parameters ${parameters}`, async () => {
          const markdown = `[Test Link](example${extension}${parameters})`;
          const expectedTokens = [
            { type: "link_open", tag: tag, block: true, attrs: [ [ "src", `test/example${extension}${parameters}`] ] },
            { type: "text", content: "Test Link" },
            { type: "link_close", tag: tag, block: true, attrs: [ [ "src", `test/example${extension}${parameters}`] ] }
        ] as unknown as Token[];

          expectTokens(markdown, expectedTokens);
        });
      });
    });
  });
});

function expectTokens(markdown: string, expectedTokens: Token[]) {
  const md = new MarkdownIt();
  md.use(linkTransformRulerPlugin, {
    transformers: [  urlRewriterFactory("test/example.md"), transformComponentLink ]
  });
  expectMarkdownToMatchTokens(md, markdown, expectedTokens);
}
