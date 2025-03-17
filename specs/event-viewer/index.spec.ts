import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { EventViewer } from "../../src/event-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { Event } from "../../src/event-viewer/models";

test.describe("event-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/1.event.yml", new URL("1.event.yml", import.meta.url)),
            new FileRoute("/2.event.yml", new URL("2.event.yml", import.meta.url)),
            new FileRoute("/parameters.yml", new URL("parameters.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);
    });

    test("can load data", async ({ mount, page }) => {
        const model = await readYamlAndParseAs<Event>(new URL("1.event.yml", import.meta.url));

        const component = await mount(EventViewer, {
            props: {
                "model": model
            }
        });

        await expectComponentToContain(component, 7);
    });

    test("can load src", async ({ mount, router }) => {
        const component = await mount(EventViewer, {
            props: {
                src: "1.event.yml"
            }
        });

        await expectComponentToContain(component, 7);
    });

    test("can load references", async ({ mount, router }) => {
        const component = await mount(EventViewer, {
            props: {
                src: "2.event.yml"
            }
        });

        await expectComponentToContain(component, 6);
    });

    test("can change src", async ({ mount, router }) => {
        const component = await mount(EventViewer, {
            props: {
                src: "1.event.yml"
            }
        });

        await expectComponentToContain(component, 7);

        await component.update({
            props: {
                src: "2.event.yml"
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