import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import linkTransformComponent, { components } from "../../../src/markdown-viewer/web-components-transformer";
import { Link } from "../../../src/markdown-viewer/link-transform-ruler";

import { tag as BPMNTag } from "../../../src/bpmn-viewer";
import { tag as BusinessModelCanvasTag } from "../../../src/business-model-canvas";
import { tag as BusinessReferenceArchitecturesTag } from "../../../src/business-reference-architecture";
import { tag as CommandTag } from "../../../src/command-viewer";
import { tag as DMNTag } from "../../../src/dmn-viewer";
import { tag as EventTag } from "../../../src/event-viewer";
import { tag as ModelTag } from "../../../src/model-viewer";
import { tag as QueryTag } from "../../../src/query-viewer";
import { tag as TaskTag } from "../../../src/task-viewer";

test.describe("webComponentsTransformer", () => {

  test("expect components to contain exactly tags", async () => {
    // @Tristan, wanneer ik de regel hieronder aanzet dan krijg ik de foutmelding dat de inline css bestanden niet geladen kunnen worden.
    // Graag advies hoe dit te voorkomen.

    // const expected = [BPMNTag, BusinessModelCanvasTag, BusinessReferenceArchitecturesTag, CommandTag, DMNTag, EventTag, ModelTag, QueryTag, TaskTag].sort();
    // const actual = [...new Set(components.map(c => c.tag))].sort();

    // expect(actual).toEqual(expected);
  });

//   components.forEach(({ extensions, tag }) => {
//     extensions.forEach((extension) => {
//       test(`should transform link with extension ${extension} to tag ${tag}`, async () => {
//         const md = new MarkdownIt();
//         const markdown = `[Test Link](example${extension})`;
//         const tokens = md.parse(markdown, {});
//         const linkOpenToken = tokens.find((token) => token.type === "link_open");
//         const linkCloseToken = tokens.find((token) => token.type === "link_close");
//         const textToken = tokens.find((token) => token.type === "text");

//         if (linkOpenToken && linkCloseToken && textToken) {
//           const mockLink = new MockLink(`example${extension}`, textToken.content);
//           linkTransformComponent(linkOpenToken, mockLink);
//           linkTransformComponent(linkCloseToken, mockLink);

//           expect(linkOpenToken.tag).toBe(tag);
//           expect(linkOpenToken.block).toBe(true);
//           expect(linkOpenToken.attrGet("src")).toBe(`example${extension}`);
//           expect(linkOpenToken.attrGet("href")).toBeNull();
//         }
//         else {
//           expect(false).toBe(true); // Fail if tokens are not found
//         }
//       });
//     });
//   });

//   test("should not transform link without matching extension", async () => {
//     const md = new MarkdownIt();
//     const markdown = "[Test Link](example.txt)";
//     const tokens = md.parse(markdown, {});
//     const linkOpenToken = tokens.find((token) => token.type === "link_open");
//     const linkCloseToken = tokens.find((token) => token.type === "link_close");
//     const textToken = tokens.find((token) => token.type === "text");
//     if (linkOpenToken && linkCloseToken && textToken) {
//       const mockLink = new MockLink("example.txt", textToken.content);
//       linkTransformComponent(linkOpenToken, mockLink);
//       linkTransformComponent(linkCloseToken, mockLink);

//       expect(linkOpenToken.tag).toBeUndefined();
//       expect(linkOpenToken.block).toBeUndefined();
//       expect(linkOpenToken.attrGet("src")).toBeNull();
//       expect(linkOpenToken.attrGet("href")).toBe("example.txt");
//     }
//     else {
//       expect(false).toBe(true);
//     }
//   });

//   test("should handle links with query parameters and hashes", async () => {
//     const md = new MarkdownIt();
//     const markdown = "[Test Link](example.bpmn?query=1#hash)";
//     const tokens = md.parse(markdown, {});
//     const linkOpenToken = tokens.find((token) => token.type === "link_open");
//     const linkCloseToken = tokens.find((token) => token.type === "link_close");
//     const textToken = tokens.find((token) => token.type === "text");

//     if (linkOpenToken && linkCloseToken && textToken) {
//       const mockLink = new MockLink("example.bpmn?query=1#hash", textToken.content);
//       linkTransformComponent(linkOpenToken, mockLink);
//       linkTransformComponent(linkCloseToken, mockLink);

//       expect(linkOpenToken.tag).toBe("bpmn-viewer");
//       expect(linkOpenToken.block).toBe(true);
//       expect(linkOpenToken.attrGet("src")).toBe("example.bpmn?query=1#hash");
//       expect(linkOpenToken.attrGet("href")).toBeNull();
//     } else {
//       expect(false).toBe(true);
//     }
//   });
});

// class MockLink implements Link {
//   private href: string;
//   private text: string;

//   constructor(href: string, text: string) {
//     this.href = href;
//     this.text = text;
//   }

//   getAttribute(name: string): string | null | undefined {
//     return name === "href" ? this.href : null;
//   }

//   getPath(): string | null | undefined {
//     return this.href.split("?")[0]?.split("#")[0];
//   }

//   getText(): string | null | undefined {
//     return this.text;
//   }
// }