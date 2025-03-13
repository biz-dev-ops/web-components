import { expect, test } from "@sand4rt/experimental-ct-web";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { MarkdownViewer } from "../../src/markdown-viewer";

test.describe("markdown-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
             new FileRoute("/markdown.md", new URL("markdown.md", import.meta.url))
        ]);
    });

    test("can render markdown", async ({ mount }) => {
        const component = await mount(MarkdownViewer, {
            props: {
                src: "markdown.md"
            }
        });

        await expect(component).toContainText("Hello World");
    });
});