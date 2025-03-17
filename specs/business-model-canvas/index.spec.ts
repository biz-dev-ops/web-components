import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { BusinessModelCanvasComponent } from "../../src/business-model-canvas";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAsObject, readYamlAndParseAs } from "../helper/fs-helper";
import { data as defaultData } from "../../src/business-model-canvas/data";
import { Model } from "../../src/business-model-canvas/models";
import { processStringsRecursively } from "../helper/string-helper";

test.describe("business-model-canvas", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/business-model-canvas.yml", new URL("business-model-canvas.yml", import.meta.url))
        ]);
    });

    test("loads default data", async ({ mount }) => {
        const component = await mount(BusinessModelCanvasComponent);

        await expectComponentToContainData(component, defaultData);
    });

    test("can load data", async ({ mount, page }) => {
        const model = await readYamlAndParseAs<Model>(new URL("business-model-canvas.yml", import.meta.url));
        await page.waitForLoadState("networkidle");

        const component = await mount(BusinessModelCanvasComponent, {
            props: {
                "model": model
            }
        });

        await expectComponentToContainData(component, model);
    });

    test("can load src", async ({ mount }) => {
        const json = await readYamlAndParseAsObject(new URL("business-model-canvas.yml", import.meta.url));

        const component = await mount(BusinessModelCanvasComponent, {
            props: {
                src: "business-model-canvas.yml"
            }
        });

        await expectComponentToContainData(component, json);
    });

    test("can change src", async ({ mount }) => {
        const json = await readYamlAndParseAsObject(new URL("business-model-canvas.yml", import.meta.url));

        const component = await mount(BusinessModelCanvasComponent);

        await component.update({
            props: {
                src: "business-model-canvas.yml"
            }
        });

        await expectComponentToContainData(component, json);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContainData(component: MountResult<BusinessModelCanvasComponent>, data: any) {
    await processStringsRecursively(data, async (text, key) => {
        if(key != "icon") {
            await expect(component).toContainText(text);
        }
    });
}


