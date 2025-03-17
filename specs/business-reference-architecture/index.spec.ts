import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { BusinessReferenceArchitectureComponent } from "../../src/business-reference-architecture";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { processStringsRecursively } from "../helper/string-helper";
import { Section } from "../../src/business-reference-architecture/models";

test.describe("business-reference-architecture", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/1.business-reference-architecture.yml", new URL("1.business-reference-architecture.yml", import.meta.url)),
            new FileRoute("/2.business-reference-architecture.yml", new URL("2.business-reference-architecture.yml", import.meta.url))
        ]);
    });

    test("can load data", async ({ mount }) => {
        const model = await readYamlAndParseAs<Section[]>(new URL("1.business-reference-architecture.yml", import.meta.url));

        const component = await mount(BusinessReferenceArchitectureComponent, {
            props: {
                "model": model
            }
        });

        await expectComponentToContainData(component, model);
    });

    test("can load src", async ({ mount }) => {
        const model = await readYamlAndParseAs<Section[]>(new URL("1.business-reference-architecture.yml", import.meta.url));

        const component = await mount(BusinessReferenceArchitectureComponent, {
            props: {
                src: "1.business-reference-architecture.yml"
            }
        });

        await expectComponentToContainData(component, model);
    });

    test("can change src", async ({ mount, router }) => {
        let model = await readYamlAndParseAs<Section[]>(new URL("1.business-reference-architecture.yml", import.meta.url));

        const component = await mount(BusinessReferenceArchitectureComponent, {
            props: {
                src: "1.business-reference-architecture.yml"
            }
        });

        await expectComponentToContainData(component, model);

        await component.update({
            props: {
                src: "2.business-reference-architecture.yml"
            }
        });

        model = await readYamlAndParseAs<Section[]>(new URL("2.business-reference-architecture.yml", import.meta.url));

        await expectComponentToContainData(component, model);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContainData(component: MountResult<BusinessReferenceArchitectureComponent>, data: any) {
    await processStringsRecursively(data, async (text, key) => {
        if(key === "title") {
            await expect(component).toContainText(text);
        }
    });
}