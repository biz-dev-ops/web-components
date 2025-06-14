import { expect, test } from "@sand4rt/experimental-ct-web";
import { FileRoute, StringContentRoute, useRoutes } from "../helper/router-helper";
import { MarkdownViewer } from "../../src/markdown-viewer";

const components = [
  { extension: "bpmn", tag: "bpmn-viewer" },
  { extension: "business-model-canvas.yml", tag: "business-model-canvas" },
  { extension: "business-model-canvas.yaml", tag: "business-model-canvas" },
  { extension: "business-reference-architecture.yml", tag: "business-reference-architecture" },
  { extension: "business-reference-architecture.yaml", tag: "business-reference-architecture" },
  { extension: "dmn", tag: "dmn-viewer" },
  { extension: "mmd", tag: "mermaid-viewer" },
  { extension: "schema.yml", tag: "schema-viewer" },
  { extension: "schema.yaml", tag: "schema-viewer" }
];

test.describe("markdown-viewer", async () => {

  test("can render markdown", async ({ mount, router }) => {
    await useRoutes(router, new FileRoute("/markdown.md", new URL("examples/markdown.md", import.meta.url)));

    const component = await mount(MarkdownViewer, {
      props: {
        src: "markdown.md"
      }
    });

    await expect(component).toContainText("Hello World");
  });

  test("can render tabs", async ({ mount, router }) => {
    await useRoutes(router, new FileRoute("/markdown-tabs.md", new URL("examples/tabs.md", import.meta.url)));

    const component = await mount(MarkdownViewer, {
      props: {
        "src": "markdown-tabs.md"
      }
    });

    const elements = component.locator("bdo-tabs");
    const count = await elements.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test("can render nested headers", async ({ mount, router }) => {
    await useRoutes(router, new FileRoute("/markdown.md", new URL("examples/markdown.md", import.meta.url)));

    const component = await mount(MarkdownViewer, {
      props: {
        "src": "markdown.md"
      }
    });

    const elements = component.locator("bdo-heading-container");
    const count = await elements.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  components.forEach(({ extension, tag }) => {
    ["?", "#"].forEach(p => {
      test(`can render ${extension} and parameter seperator ${p}`, async ({ mount, router }) => {
        await useRoutes(router, new StringContentRoute(`/markdown-${extension}.md`, `[Test ${extension}](test.${extension}${p}xxxx=yyyyy)`));

        const component = await mount(MarkdownViewer, {
          props: {
            src: `markdown-${extension}.md`
          }
        });

        await expect(component.locator(tag)).toHaveCount(1);
      });
    });
  });

  test("shows error for invalid src", async ({ mount }) => {
    const component = await mount(MarkdownViewer, {
      props: {
        src: "invalid file"
      }
    });

    await expect(component.locator("[type='error']")).toBeVisible();
  });
});