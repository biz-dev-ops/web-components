import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { CommandViewer } from "../../src/command-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readAsJsonString as readFileAsJsonString } from "../helper/fs-helper";

test.describe("command-viewer", async () => {

    test("can load data", async ({ mount }) => {
        const json = await readFileAsJsonString(new URL("command1.yml", import.meta.url));

        const component = await mount(CommandViewer, {
            props: {
                "json": json
            }
        });

        await expectComponentToContain(component, 16, 3);
    });

    test("can load src", async ({ mount, router }) => {
        await useRoutes(router, new FileRoute("/command1.yml", new URL("command1.yml", import.meta.url)));

        const component = await mount(CommandViewer, {
            props: {
                src: "command1.yml"
            }
        });

        await expectComponentToContain(component, 16, 3);
    });

    test("can load references", async ({ mount, router }) => {
        await useRoutes(router, [
            new FileRoute("/command2.yml", new URL("command2.yml", import.meta.url)),
            new FileRoute("/parameters.yml", new URL("parameters.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);

        const component = await mount(CommandViewer, {
            props: {
                src: "command2.yml"
            }
        });

        await expectComponentToContain(component, 9, 2);
    });

    test("can change src", async ({ mount, router }) => {
        await useRoutes(router, [
            new FileRoute("/command1.yml", new URL("command1.yml", import.meta.url))
        ]);

        const component = await mount(CommandViewer, {
            props: {
                src: "command1.yml"
            }
        });

        await expectComponentToContain(component, 16, 3);

        await useRoutes(router, [
            new FileRoute("/command2.yml", new URL("command2.yml", import.meta.url)),
            new FileRoute("/parameters.yml", new URL("parameters.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);

        await component.update({
            props: {
                src: "command2.yml"
            }
        });

        await expectComponentToContain(component, 9, 2);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<CommandViewer>, parameters: number, exceptions: number) : Promise<void> {
    await expect(component.getByLabel("parameters-panel").getByLabel("model-viewer-item")).toHaveCount(parameters);
    await expect(component.getByLabel("cases-panel").getByLabel("case", { exact: true })).toHaveCount(exceptions);
};