import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { TaskViewer } from "../../src/task-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { Task } from "../../src/task-viewer/models";

test.describe("task-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/1.task.yml", new URL("1.task.yml", import.meta.url)),
            new FileRoute("/2.task.yml", new URL("2.task.yml", import.meta.url)),
            new FileRoute("/context.yml", new URL("context.yml", import.meta.url)),
            new FileRoute("/actions.yml", new URL("actions.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);
    });

    test.fixme("can load data", async ({ mount }) => {
        const model = await readYamlAndParseAs<Task>(new URL("1.task.yml", import.meta.url));

        const component = await mount(TaskViewer, {
            props: {
                "model": model
            }
        });

        await expectComponentToContain(component, 3, 2, 3);
    });

    test("can load src", async ({ mount }) => {
        const component = await mount(TaskViewer, {
            props: {
                src: "1.task.yml"
            }
        });

        await expectComponentToContain(component, 3, 2, 3);
    });

    test("can load references", async ({ mount }) => {
        const component = await mount(TaskViewer, {
            props: {
                src: "2.task.yml"
            }
        });

        await expectComponentToContain(component, 3, 2, 3);
    });

    test("can change src", async ({ mount }) => {
        const component = await mount(TaskViewer, {
            props: {
                src: "1.task.yml"
            }
        });

        await expectComponentToContain(component, 3, 2, 3);

        await component.update({
            props: {
                src: "2.task.yml"
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