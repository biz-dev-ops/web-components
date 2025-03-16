import { expect, test } from "@sand4rt/experimental-ct-web";
import { FileRoute, StringContentRoute, useRoutes } from "../helper/router-helper";
import { MarkdownViewer } from "../../src/markdown-viewer";

const components = [
  { extension: "bpmn", tag: "bpmn-viewer" },
  { extension: "business-model-canvas.yml", tag: "business-model-canvas" },
  { extension: "business-model-canvas.yaml", tag: "business-model-canvas" },
  { extension: "business-reference-architecture.yml", tag: "business-reference-architecture" },
  { extension: "business-reference-architecture.yaml", tag: "business-reference-architecture" },
  { extension: "command.yml", tag: "command-viewer" },
  { extension: "command.yaml", tag: "command-viewer" },
  { extension: "dmn", tag: "dmn-viewer" },
  { extension: "event.yml", tag: "event-viewer" },
  { extension: "event.yaml", tag: "event-viewer" },
  { extension: "model.yml", tag: "model-viewer" },
  { extension: "model.yaml", tag: "model-viewer" },
  { extension: "query.yml", tag: "query-viewer" },
  { extension: "query.yaml", tag: "query-viewer" },
  { extension: "task.yml", tag: "task-viewer" },
  { extension: "task.yaml", tag: "task-viewer" }
];

test.describe("markdown-viewer", async () => {

  test("can render markdown", async ({ mount, router }) => {
    await useRoutes(router, new FileRoute("/markdown.md", new URL("markdown.md", import.meta.url)));

    const component = await mount(MarkdownViewer, {
      props: {
        src: "markdown.md"
      }
    });

    await expect(component).toContainText("Hello World");
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

        await expect(component.locator(tag)).toBeVisible();
      });
    });
  });
});