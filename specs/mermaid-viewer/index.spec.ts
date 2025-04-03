import { test, expect } from "@sand4rt/experimental-ct-web";
import { MermaidViewer } from "../../src/mermaid-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";

test.describe("mermaid-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/diagram1.mmd", new URL("diagram1.mmd", import.meta.url)),
            new FileRoute("/diagram2.mmd", new URL("diagram2.mmd", import.meta.url))
        ]);
    });

    test("can load src", async ({ mount }) => {
        const component = await mount(MermaidViewer, {
            props: {
                src: "diagram1.mmd"
            }
        });

        await expect(component.locator("svg")).toBeVisible();
    });

    test("can change src", async ({ mount }) => {
        const component = await mount(MermaidViewer, {
            props: {
                src: "diagram1.mmd"
            }
        });

        await expect(component.locator("svg")).toBeVisible();

        await component.update({
            props: {
                src: "diagram2.mmd"
            }
        });

        await expect(component.locator("svg")).toBeVisible();
    });

    test("shows error for invalid diagram", async ({ mount }) => {
        const component = await mount(MermaidViewer, {
            props: {
                mmd: "invalid mermaid syntax"
            }
        });

        await expect(component.locator("[type='error']")).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});