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
            new FileRoute("/canvas.yml", new URL("canvas.yml", import.meta.url))
        ]);
    });

    test("loads default data", async ({ mount }) => {
        const component = await mount(BusinessModelCanvasComponent);

        await expectComponentToContainData(component, defaultData);
    });

    test("can load data", async ({ mount }) => {
        const json = await readYamlAndParseAs<Model>(new URL("canvas.yml", import.meta.url));

        const component = await mount(BusinessModelCanvasComponent, {
            props: {
                "model": json
            }
        });

        await expectComponentToContainData(component, json);
    });

    test("can load src", async ({ mount }) => {
        const json = await readYamlAndParseAsObject(new URL("canvas.yml", import.meta.url));

        const component = await mount(BusinessModelCanvasComponent, {
            props: {
                src: "canvas.yml"
            }
        });

        await expectComponentToContainData(component, json);
    });

    test("can change src", async ({ mount }) => {
        const json = await readYamlAndParseAsObject(new URL("canvas.yml", import.meta.url));

        const component = await mount(BusinessModelCanvasComponent);

        await component.update({
            props: {
                src: "canvas.yml"
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


