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

    test("can load data", async ({ mount, page }) => {
        const model = await readYamlAndParseAs<ModelItem>(new URL("1.model.yml", import.meta.url));

        const component = await mount(ModelViewer, {
            props: {
                "model": model
            }
        });

        await expectComponentToContain(component, model);
    });

    test("can load src", async ({ mount, page }) => {
        const model = await readYamlAndParseAs<ModelItem>(new URL("1.model.yml", import.meta.url));

        const component = await mount(ModelViewer, {
            props: {
                src: "1.model.yml"
            }
        });

        await expectComponentToContain(component, model);
    });

    test("can load references", async ({ mount, page }) => {
        const model = await readYamlAndParseAs<ModelItem>(new URL("2.model.yml", import.meta.url));

        const component = await mount(ModelViewer, {
            props: {
                src: "2.model.yml"
            }
        });

        await expectComponentToContain(component, model);
    });

    test("can change src", async ({ mount }) => {
        let model = await readYamlAndParseAs<ModelItem>(new URL("1.model.yml", import.meta.url));

        const component = await mount(ModelViewer, {
            props: {
                src: "1.model.yml"
            }
        });

        await expectComponentToContain(component, model);

        model = await readYamlAndParseAs<ModelItem>(new URL("2.model.yml", import.meta.url));

        await component.update({
            props: {
                src: "2.model.yml"
            }
        });

        await expectComponentToContain(component, model);
    });

    test("shows error for invalid src", async ({ mount }) => {
        const component = await mount(ModelViewer, {
            props: {
                src: "invalid file"
            }
        });

        await expect(component.locator("[type='error']")).toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<ModelViewer>, model: ModelItem) : Promise<void> {
    await expect(component).toContainText(model.title);
    await expect(component).toContainText(model.description);

    for(const key of Object.keys(model.properties)) {
        await expect(component).toContainText(key);
    }
};