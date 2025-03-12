import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { EventViewer } from "../../src/event-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readAsJsonString as readFileAsJsonString } from "../helper/fs-helper";

test.describe("event-viewer", async () => {

    test("can load data", async ({ mount }) => {
        const json = await readFileAsJsonString(new URL("event1.yml", import.meta.url));

        const component = await mount(EventViewer, {
            props: {
                "json": json
            }
        });

        await expectComponentToContain(component, 7);
    });

    test("can load src", async ({ mount, router }) => {
        await useRoutes(router, new FileRoute("/event1.yml", new URL("event1.yml", import.meta.url)));

        const component = await mount(EventViewer, {
            props: {
                src: "event1.yml"
            }
        });

        await expectComponentToContain(component, 7);
    });

    test("can load references", async ({ mount, router }) => {
        await useRoutes(router, [
            new FileRoute("/event2.yml", new URL("event2.yml", import.meta.url)),
            new FileRoute("/parameters.yml", new URL("parameters.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);

        const component = await mount(EventViewer, {
            props: {
                src: "event2.yml"
            }
        });

        await expectComponentToContain(component, 6);
    });

    test("can change src", async ({ mount, router }) => {
        await useRoutes(router, [
            new FileRoute("/event1.yml", new URL("event1.yml", import.meta.url))
        ]);

        const component = await mount(EventViewer, {
            props: {
                src: "event1.yml"
            }
        });

        await expectComponentToContain(component, 7);

        await useRoutes(router, [
            new FileRoute("/event2.yml", new URL("event2.yml", import.meta.url)),
            new FileRoute("/parameters.yml", new URL("parameters.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);

        await component.update({
            props: {
                src: "event2.yml"
            }
        });

        await expectComponentToContain(component, 6);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<EventViewer>, parameters: number) : Promise<void> {
    await expect(component.getByLabel("event-parameters").getByLabel("model-viewer-item")).toHaveCount(parameters);
};