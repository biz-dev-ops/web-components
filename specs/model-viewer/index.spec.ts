import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { ModelViewer } from "../../src/model-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { ModelItem } from "../../src/model-viewer/models";

test.describe("model-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/1.model.yml", new URL("1.model.yml", import.meta.url)),
            new FileRoute("/2.model.yml", new URL("2.model.yml", import.meta.url))
        ]);
    });

    test.fixme("can load data", async ({ mount }) => {
        const model = await readYamlAndParseAs<ModelItem>(new URL("1.model.yml", import.meta.url));

        const component = await mount(ModelViewer, {
            props: {
                "model": model
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test("can load src", async ({ mount }) => {
        const component = await mount(ModelViewer, {
            props: {
                src: "1.model.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test("can load references", async ({ mount }) => {
        const component = await mount(ModelViewer, {
            props: {
                src: "2.model.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test("can change src", async ({ mount }) => {
        const component = await mount(ModelViewer, {
            props: {
                src: "1.model.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);

        await component.update({
            props: {
                src: "2.model.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<ModelViewer>, parameters: number, response: number, exceptions: number) : Promise<void> {
    await expect(component.getByLabel("model-parameters").getByLabel("model-viewer-item")).toHaveCount(parameters);
    await expect(component.getByLabel("model-response").getByLabel("model-viewer-item")).toHaveCount(response);
    await expect(component.getByLabel("model-exceptions").getByLabel("case", { exact: true })).toHaveCount(exceptions);
};