import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { CommandViewer } from "../../src/command-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { Command } from "../../src/command-viewer/models";

test.describe("command-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/1.command.yml", new URL("1.command.yml", import.meta.url)),
            new FileRoute("/2.command.yml", new URL("2.command.yml", import.meta.url)),
            new FileRoute("/parameters.yml", new URL("parameters.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);
    });

    test("can load data", async ({ mount, page }) => {
        const model = await readYamlAndParseAs<Command>(new URL("1.command.yml", import.meta.url));
        await page.waitForLoadState("networkidle");

        const component = await mount(CommandViewer, {
            props: {
                "model": model
            }
        });

        await expectComponentToContain(component, 7, 3);
    });

    test("can load src", async ({ mount, router }) => {
        const component = await mount(CommandViewer, {
            props: {
                src: "1.command.yml"
            }
        });

        await expectComponentToContain(component, 7, 3);
    });

    test("can load references", async ({ mount, router }) => {
        const component = await mount(CommandViewer, {
            props: {
                src: "2.command.yml"
            }
        });

        await expectComponentToContain(component, 5, 2);
    });

    test("can change src", async ({ mount, router }) => {
        const component = await mount(CommandViewer, {
            props: {
                src: "1.command.yml"
            }
        });

        await expectComponentToContain(component, 7, 3);

        await component.update({
            props: {
                src: "2.command.yml"
            }
        });

        await expectComponentToContain(component, 5, 2);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<CommandViewer>, parameters: number, exceptions: number) : Promise<void> {
    await expect(component.getByLabel("command-parameters").getByLabel("model-viewer-item")).toHaveCount(parameters);
    await expect(component.getByLabel("command-exceptions").getByLabel("case", { exact: true })).toHaveCount(exceptions);
};