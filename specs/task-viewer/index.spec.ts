import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { TaskViewer } from "../../src/task-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { Task } from "../../src/task-viewer/models";

test.describe("task-viewer", async () => {
    test.beforeEach(async ({ router }) => { 
        await useRoutes(router, [
            new FileRoute("/task1.yml", new URL("task1.yml", import.meta.url)),
            new FileRoute("/task2.yml", new URL("task2.yml", import.meta.url)),
            new FileRoute("/context.yml", new URL("context.yml", import.meta.url)),
            new FileRoute("/actions.yml", new URL("actions.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);
    });

    test("can load data", async ({ mount }) => {
        const model = await readYamlAndParseAs<Task>(new URL("task1.yml", import.meta.url));

        const component = await mount(TaskViewer, {
            props: {
                "model": model
            }
        });

        await expectComponentToContain(component, 3, 2, 3);
    });

    test("can load src", async ({ mount, router }) => {
        const component = await mount(TaskViewer, {
            props: {
                src: "task1.yml"
            }
        });

        await expectComponentToContain(component, 3, 2, 3);
    });

    test("can load references", async ({ mount, router }) => {
        const component = await mount(TaskViewer, {
            props: {
                src: "task2.yml"
            }
        });

        await expectComponentToContain(component, 3, 2, 3);
    });

    test("can change src", async ({ mount, router }) => {
        const component = await mount(TaskViewer, {
            props: {
                src: "task1.yml"
            }
        });

        await expectComponentToContain(component, 3, 2, 3);

        await component.update({
            props: {
                src: "task2.yml"
            }
        });

        await expectComponentToContain(component, 3, 2, 3);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<TaskViewer>, parameters: number, actions: number, exceptions: number) : Promise<void> {
    await expect(component.getByLabel("task-context").getByLabel("model-viewer-item")).toHaveCount(parameters);
    await expect(component.getByLabel("task-actions").getByLabel("case", { exact: true })).toHaveCount(actions);
    await expect(component.getByLabel("task-exceptions").getByLabel("case", { exact: true })).toHaveCount(exceptions);
};