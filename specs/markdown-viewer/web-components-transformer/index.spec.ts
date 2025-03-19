import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import transformer, { components } from "../../../src/markdown-viewer/web-components-transformer";
import { Link } from "../../../src/markdown-viewer/link-transform-ruler";

test.describe("webComponentsTransformer", () => {

  test("expect components to contain exactly tags", async () => {
    const expected = [
      "bpmn-viewer",
      "business-model-canvas",
      "business-reference-architecture",
      "command-viewer",
      "dmn-viewer",
      "event-viewer",
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
        const { linkOpenToken, linkCloseToken, textToken } = getTokens(markdown);

        if (linkOpenToken && linkCloseToken && textToken) {
          const mockLink = new MockLink(`example${extension}`, textToken.content);
          transformer(linkOpenToken, mockLink);
          transformer(linkCloseToken, mockLink);

          expect(linkOpenToken.tag).toBe(tag);
          expect(linkOpenToken.block).toBe(true);
          expect(linkOpenToken.attrGet("src")).toBe(`example${extension}`);
          expect(linkOpenToken.attrGet("href")).toBeNull();
        }
        else {
          expect(false).toBe(true);
        }
      });
    });
  });

  test("should not transform link without matching extension", async () => {
    const markdown = "[Test Link](example.txt)";
    const { linkOpenToken, linkCloseToken, textToken } = getTokens(markdown);

    if (linkOpenToken && linkCloseToken && textToken) {
      const mockLink = new MockLink("example.txt", textToken.content);
      transformer(linkOpenToken, mockLink);
      transformer(linkCloseToken, mockLink);

      expect(linkOpenToken.tag).toBe("a");
      expect(linkOpenToken.block).toBe(false);
      expect(linkOpenToken.attrGet("src")).toBeNull();
      expect(linkOpenToken.attrGet("href")).toBe("example.txt");
    }
    else {
      expect(false).toBe(true);
    }
  });

  components.forEach(({ extensions, tag }) => {
    extensions.forEach((extension) => {
      ["?query=1", "#hash", "?query=1#hash"].forEach(parameters => {
        test(`should transform link with extension ${extension} to tag ${tag} with parameters ${parameters}`, async () => {
          const markdown = "[Test Link](example.bpmn?query=1#hash)";
          const { linkOpenToken, linkCloseToken, textToken } = getTokens(markdown);

          if (linkOpenToken && linkCloseToken && textToken) {
            const mockLink = new MockLink("example.bpmn?query=1#hash", textToken.content);
            transformer(linkOpenToken, mockLink);
            transformer(linkCloseToken, mockLink);

            expect(linkOpenToken.tag).toBe("bpmn-viewer");
            expect(linkOpenToken.block).toBe(true);
            expect(linkOpenToken.attrGet("src")).toBe("example.bpmn?query=1#hash");
            expect(linkOpenToken.attrGet("href")).toBeNull();
          }
          else {
            expect(false).toBe(true);
          }
        });
      })
    });
  });
});

class MockLink implements Link {
  private href: string;
  private text: string;

  constructor(href: string, text: string) {
    this.href = href;
    this.text = text;
  }

  getAttribute(name: string): string | null | undefined {
    return name === "href" ? this.href : null;
  }

  getPath(): string | null | undefined {
    return this.href.split("?")[0]?.split("#")[0];
  }

  getText(): string | null | undefined {
    return this.text;
  }
}

function getTokens(markdown: string) {
  const md = new MarkdownIt();
  const tokens = md.parse(markdown, {});
  const inlineToken = tokens.find((token) => token.type === "inline");
  const linkOpenToken = inlineToken?.children?.find((token) => token.type === "link_open");
  const linkCloseToken = inlineToken?.children?.find((token) => token.type === "link_close");
  const textToken = inlineToken?.children?.find((token) => token.type === "text");
  return { linkOpenToken, linkCloseToken, textToken };
}
