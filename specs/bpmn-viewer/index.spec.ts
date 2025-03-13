import { test, expect } from "@sand4rt/experimental-ct-web";
import { BPMNViewer } from "../../src/bpmn-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";

test.describe("bpmn-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/custom-links.bpmn", new URL("custom-links.bpmn", import.meta.url)),
            new FileRoute("/subprocesses.bpmn", new URL("subprocesses.bpmn", import.meta.url))
        ]);
    });

    test("can load src", async ({ mount }) => {
        const component = await mount(BPMNViewer, {
            props: {
                src: "custom-links.bpmn"
            }
        });

        await expect(component.locator(".djs-container svg")).toBeVisible();
    });

    test("can change src", async ({ mount }) => {
        const component = await mount(BPMNViewer, {
            props: {
                src: "custom-links.bpmn"
            }
        });

        await expect(component).toContainText("Process_CustomLinks");
        await expect(component).not.toContainText("Process_Subprocesses");

        await component.update({
            props: {
                src: "subprocesses.bpmn"
            }
        });

        await expect(component).toContainText("Process_Subprocesses");
        await expect(component).not.toContainText("Process_CustomLinks");
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});