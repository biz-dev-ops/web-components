import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { QueryViewer } from "../../src/query-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { Query } from "../../src/query-viewer/models";

test.describe("query-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/1.query.yml", new URL("1.query.yml", import.meta.url)),
            new FileRoute("/2.query.yml", new URL("2.query.yml", import.meta.url)),
            new FileRoute("/parameters.yml", new URL("parameters.yml", import.meta.url)),
            new FileRoute("/response.yml", new URL("response.yml", import.meta.url)),
            new FileRoute("/exceptions.yml", new URL("exceptions.yml", import.meta.url))
        ]);
    });

    test.fixme("can load data", async ({ mount }) => {
        const model = await readYamlAndParseAs<Query>(new URL("1.query.yml", import.meta.url));

        const component = await mount(QueryViewer, {
            props: {
                "model": model
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test("can load src", async ({ mount, router }) => {
        const component = await mount(QueryViewer, {
            props: {
                src: "1.query.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test("can load references", async ({ mount, router }) => {
        const component = await mount(QueryViewer, {
            props: {
                src: "2.query.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test("can change src", async ({ mount, router }) => {
        const component = await mount(QueryViewer, {
            props: {
                src: "1.query.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);

        await component.update({
            props: {
                src: "2.query.yml"
            }
        });

        await expectComponentToContain(component, 5, 1, 3);
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<QueryViewer>, parameters: number, response: number, exceptions: number) : Promise<void> {
    await expect(component.getByLabel("query-parameters").getByLabel("model-viewer-item")).toHaveCount(parameters);
    await expect(component.getByLabel("query-response").getByLabel("model-viewer-item")).toHaveCount(response);
    await expect(component.getByLabel("query-exceptions").getByLabel("case", { exact: true })).toHaveCount(exceptions);
};