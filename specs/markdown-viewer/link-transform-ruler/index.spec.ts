import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import linkTransformRuler, { Link } from "../../../src/markdown-viewer/link-transform-ruler";
import { Token } from "markdown-it/index.js";

test.describe("linkTransformRuler Plugin (Token Tests)", () => {
  test("should transform link attributes in tokens", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, {
      transformer: (token: Token, link: Link) => {
        if (token.type === "link_open") {
          token.attrSet("data-test", "transformed");
        }
      },
    });

    const markdown = "[Link](example.com)";
    const tokens = md.parse(markdown, {});
    expect(tokens).toHaveLength(3);
    const linkOpenToken = tokens.find((token) => token.type === "inline")
      ?.children?.find((token) => token.type === "link_open");

    expect(linkOpenToken?.attrGet("data-test")).toBe("transformed");
  });

  test("should transform link text in tokens", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, {
      transformer: (token: Token, link: Link) => {
        if (token.type === "text") {
          token.content = "Transformed Link Text";
        }
      },
    });

    const markdown = "[Link](example.com)";
    const tokens = md.parse(markdown, {});
    expect(tokens).toHaveLength(3);
    const textToken = tokens.find((token) => token.type === "inline")
      ?.children?.find((token) => token.type === "text");

    expect(textToken?.content).toBe("Transformed Link Text");
  });

  test("should transform link path in tokens", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, {
      transformer: (token: Token, link: Link) => {
        if (token.type === "link_open") {
          token.attrSet("href", link.getPath() + "/transformed");
        }
      },
    });

    const markdown = "[Link](example.com?query=1#hash)";
    const tokens = md.parse(markdown, {});
    expect(tokens).toHaveLength(3);
    const linkOpenToken = tokens.find((token) => token.type === "inline")
      ?.children?.find((token) => token.type === "link_open");

    expect(linkOpenToken?.attrGet("href")).toBe("example.com/transformed");
  });

  test("should move block links out of inline tokens", async ({}) => {
    const md = new MarkdownIt({ html: true });
    md.use(linkTransformRuler, {
      transformer: (token: Token, link: Link) => {
        if (token.type === "link_open") {
          token.block = true;
        }
      },
    });

    const markdown = "[Link](example.com)\nSome text.";
    const tokens = md.parse(markdown, {});
    expect(tokens).toHaveLength(6);
    const linkOpenToken = tokens.find((token) => token.type === "link_open");
    const paragraphOpenToken = tokens.find(token => token.type === "paragraph_open");

    expect(linkOpenToken?.level).toBe(0);
    expect(paragraphOpenToken?.level).toBe(0);
    expect(tokens.filter(token => token.type === "link_open").length).toBe(1);
    expect(tokens.filter(token => token.type === "paragraph_open").length).toBe(1);
  });

  test("should remove empty paragraphs in tokens", async ({}) => {
    const md = new MarkdownIt({ html: true });
    md.use(linkTransformRuler, {
      transformer: (token: Token, link: Link) => {
        if (token.type === "link_open") {
          token.block = true;
        }
      },
    });

    const markdown = "[Link](example.com)\n\nSome text.";
    const tokens = md.parse(markdown, {});
    const paragraphOpenTokens = tokens.filter(token => token.type === "paragraph_open");
    const paragraphCloseTokens = tokens.filter(token => token.type === "paragraph_close");

    expect(paragraphOpenTokens.length).toBe(1);
    expect(paragraphCloseTokens.length).toBe(1);
  });

  test("should handle multiple block links in tokens", async ({}) => {
    const md = new MarkdownIt({ html: true });
    md.use(linkTransformRuler, {
      transformer: (token: Token, link: Link) => {
        if (token.type === "link_open") {
          token.block = true;
        }
      },
    });

    const markdown = "[Link1](example1.com)\n[Link2](example2.com)\nSome text.";
    const tokens = md.parse(markdown, {});
    const linkOpenTokens = tokens.filter(token => token.type === "link_open");
    const paragraphOpenTokens = tokens.filter(token => token.type === "paragraph_open");

    expect(linkOpenTokens.length).toBe(2);
    expect(paragraphOpenTokens.length).toBe(1);
  });

  test("should change tag names", async ({}) => {
    const md = new MarkdownIt({ html: true });
    md.use(linkTransformRuler, {
      transformer: (token: Token, link: Link) => {
        if(token.type.startsWith("link_")) {
          token.tag = "div";
          token.block = true;
        }
      },
    });

    const markdown = "[Link1](example1.com)\n[Link2](example2.com)\nSome text.";
    const tokens = md.parse(markdown, {});
    const linkTokens = tokens.filter(token => token.type.startsWith("link_"));
    const paragraphOpenTokens = tokens.filter(token => token.type === "paragraph_open");

    expect(linkTokens.length).toBe(4);
    linkTokens.forEach(t => expect(t.tag).toBe("div"));
    expect(paragraphOpenTokens.length).toBe(1);
  });
});