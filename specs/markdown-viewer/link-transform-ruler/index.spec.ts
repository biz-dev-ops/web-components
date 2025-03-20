import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import linkTransformRulerPlugin, { Link } from "../../../src/markdown-viewer/link-transform-ruler";
import { Token } from "markdown-it/index.js";
import { expectMarkdownToMatchTokens } from "../markdown-test-util";

test.describe("linkTransformRulerPlugin", () => {

  test("should transform link attributes in tokens", async ({ }) => {
    const markdown = "[Link](example.com)";

    const expectedTokens = [
      { type: "paragraph_open" },
      {
        type: "inline",
        children: [{
          type: "link_open",
          attrs: [
            ["href", "example.com"],
            ["data-test", "transformed"]
          ]
        },
        { type: "text", content: "Link" },
        { type: "link_close" }] as unknown as Token[]
      },
      { type: "paragraph_close" }
    ] as Token[];

    expectTokens(markdown, expectedTokens, (link: Link) => {
      link.tokens.forEach(token => {
        if (token.type === "link_open") {
          token.attrSet("data-test", "transformed");
        }
      });
    });
  });

  test("should transform link text in tokens", async ({ }) => {
    const markdown = "[Link](example.com)";

    const expectedTokens = [
      { type: "paragraph_open" },
      {
        type: "inline",
        children: [{ type: "link_open" },
        { type: "text", content: "Transformed Link Text" },
        { type: "link_close" }] as unknown as Token[]
      },
      { type: "paragraph_close" }
    ] as Token[];

    expectTokens(markdown, expectedTokens, (link: Link) => {
      link.tokens.forEach(token => {
        if (token.type === "text") {
          token.content = "Transformed Link Text";
        }
      });
    });
  });

  test("should transform link path in tokens", async ({ }) => {
    const markdown = "[Link](example.com?query=1#hash)";

    const expectedTokens = [
      { type: "paragraph_open" },
      {
        type: "inline",
        children: [{
          type: "link_open",
          attrs: [
            ["href", "example.com/transformed"]
          ]
        },
        { type: "text", content: "Link" },
        { type: "link_close" }] as unknown as Token[]
      },
      { type: "paragraph_close" }
    ] as Token[];

    expectTokens(markdown, expectedTokens, (link: Link) => {
      link.tokens.forEach(token => {
        if (token.type === "link_open") {
          token.attrSet("href", link.getPath() + "/transformed");
        }
      });
    });
  });

  test("should move block links out of inline tokens", async ({ }) => {
    const markdown = "[Link](example.com)\nSome text.";

    const expectedTokens = [
      { type: "link_open", level: 0, block: true },
      { type: "text", level: 1 },
      { type: "link_close", level: 0, block: true },
      { type: "paragraph_open", level: 0 },
      { type: "inline", level: 1 },
      { type: "paragraph_close", level: 0 }
    ] as Token[];

    expectTokens(markdown, expectedTokens, (link: Link) => {
      link.tokens.forEach(token => {
        if (token.type === "link_open") {
          token.block = true;
        }
      });
    });
  });

  test("should remove empty paragraphs in tokens", async ({ }) => {
    const markdown = "[Link](example.com)";

    const expectedTokens = [
      { type: "link_open" },
      { type: "text" },
      { type: "link_close" }
    ] as Token[];

    expectTokens(markdown, expectedTokens, (link: Link) => {
      link.tokens.forEach(token => {
        if (token.type === "link_open") {
          token.block = true;
        }
      });
    });
  });

  test("should handle multiple block links in tokens", async ({ }) => {
    const markdown = "[Link1](example1.com)\n[Link2](example2.com)\nSome text.";

    const expectedTokens = [
      { type: "link_open", attrs: [["href", "example1.com"]] },
      { type: "text", content: "Link1" },
      { type: "link_close" },
      { type: "link_open", attrs: [["href", "example2.com"]] },
      { type: "text", content: "Link2" },
      { type: "link_close" },
      { type: "paragraph_open" },
      {
        type: "inline",
        children: [
          { type: "softbreak" },
          { type: "softbreak" },
          { type: "text", content: "Some text." }
        ]
      },
      { type: "paragraph_close" }
    ] as unknown as Token[];

    expectTokens(markdown, expectedTokens, (link: Link) => {
      link.tokens.forEach(token => {
        if (token.type === "link_open") {
          token.block = true;
        }
      });
    });
  });

  test("should change tag names", async ({ }) => {
    const markdown = "[Link1](example1.com)\n[Link2](example2.com)\nSome text.";

    const expectedTokens = [
      { type: "link_open", tag: "div" },
      { type: "text", content: "Link1" },
      { type: "link_close", tag: "div" },
      { type: "link_open", tag: "div" },
      { type: "text", content: "Link2" },
      { type: "link_close", tag: "div" },
      { type: "paragraph_open" },
      {
        type: "inline",
        children: [
          { type: "softbreak" },
          { type: "softbreak" },
          { type: "text", content: "Some text." }
        ]
      },
      { type: "paragraph_close" }
    ] as unknown as Token[];

    expectTokens(markdown, expectedTokens, (link: Link) => {
      link.tokens.forEach(token => {
        if (token.type.startsWith("link_")) {
          token.tag = "div";
          token.block = true;
        }
      });
    });
  });
});

function expectTokens(markdown: string, expectedTokens: Token[], transformer: (link: Link) => void) {
  const md = new MarkdownIt();
  md.use(linkTransformRulerPlugin, {
    transformer
  });
  expectMarkdownToMatchTokens(md, markdown, expectedTokens);
}