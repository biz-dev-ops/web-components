import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { SchemaViewerComponent } from "../../src/schema-viewer";
import { FileRoute, useRoutes } from "../helper/router-helper";
import { readYamlAndParseAs } from "../helper/fs-helper";
import { Schema } from "../../src/shared/fetch/schema";

test.describe("schema-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new FileRoute("/simple.schema.yaml", new URL("simple.schema.yaml", import.meta.url)),
            new FileRoute("/complex.schema.yaml", new URL("complex.schema.yaml", import.meta.url)),
            new FileRoute("/relative-ref.schema.yaml", new URL("relative-ref.schema.yaml", import.meta.url)),
            new FileRoute("/definitions/address.schema.yaml", new URL("definitions/address.schema.yaml", import.meta.url))
        ]);
    });

    test("can load simple schema", async ({ mount, page }) => {
        const schema = await readYamlAndParseAs<Schema>(new URL("simple.schema.yaml", import.meta.url));

        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "simple.schema.yaml"
            }
        });

        await expect(component.locator("bdo-alert[type='error']")).not.toBeVisible();

        await expectComponentToContain(component, schema);
    });

    test("can load complex schema", async ({ mount, page }) => {
        const schema = await readYamlAndParseAs<Schema>(new URL("complex.schema.yaml", import.meta.url));

        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "complex.schema.yaml"
            }
        });

        await expect(component.locator("bdo-alert[type='error']")).not.toBeVisible();

        await expectComponentToContain(component, schema);
    });

    test("can load schema with relative file reference", async ({ mount, page }) => {
        const schema = await readYamlAndParseAs<Schema>(new URL("relative-ref.schema.yaml", import.meta.url));

        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "relative-ref.schema.yaml"
            }
        });

        await expect(component.locator("bdo-alert[type='error']")).not.toBeVisible();

        await expectComponentToContain(component, schema);

        // Verify that the referenced schema is loaded
        const addressSchema = await readYamlAndParseAs<Schema>(new URL("definitions/address.schema.yaml", import.meta.url));
        await expect(component).toContainText(addressSchema.resolveSchema("root").title);
    });

    test("shows error for invalid schema", async ({ mount }) => {
        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "invalid.schema.yaml"
            }
        });

        await expect(component.locator("bdo-alert[type='error']")).toBeVisible();
    });

    test("can navigate schema fragments", async ({ mount }) => {
        const schema = await readYamlAndParseAs<Schema>(new URL("complex.schema.yaml", import.meta.url));
        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "complex.schema.yaml"
            }
        });

        await expect(component.locator("bdo-alert[type='error']")).not.toBeVisible();

        // Click on a property to navigate
        const propertyElement = component.locator("schema-navigation").first();
        await propertyElement.click();

        // Verify navigation state
        await expect(component.locator("bdo-alert[type='error']")).not.toBeVisible();
        const rootSchema = schema.resolveSchema("root");
        await expect(component.locator("schema-navigation")).toContainText(rootSchema.title || "root");
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});

async function expectComponentToContain(component: MountResult<SchemaViewerComponent>, schema: Schema) : Promise<void> {
    // Wait for the schema to be loaded
    await expect(component.locator("schema-navigation")).toBeVisible();

    // Verify the schema title is displayed
    const rootSchema = schema.resolveSchema();
    if (rootSchema.title) {
        await expect(component).toContainText(rootSchema.title);
    }

    // Verify the root schema is displayed
    await expect(component.locator("object-schema-viewer, array-schema-viewer, primitive-schema-viewer, x-of-schema-viewer")).toBeVisible();
}