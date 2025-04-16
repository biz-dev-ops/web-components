import { expect, test } from "@sand4rt/experimental-ct-web";
import { SchemaViewerComponent } from "../../src/schema-viewer/index";
import { useRoutes, FileRoute } from "../helper/router-helper";

const mockSchemas = [
    "allOf", "anyOf", "array", "boolean", "integer", "number", "object", "oneOf", "ref", "string"
].flatMap(schema => [
    new FileRoute(`/${schema}.schema.yaml`, new URL(`./_mocks/${schema}.schema.yaml`, import.meta.url)),
    new FileRoute(`/${schema}.schema.json`, new URL(`./_mocks/${schema}.schema.json`, import.meta.url))
]);

test.describe("schema-viewer", async () => {

    test.beforeEach(async ({ router }) => {
        await useRoutes(router, mockSchemas);
    });

    test("can navigate to schema fragments", async ({ mount }) => {
        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "/ref.schema.yaml"
            }
        });

        await expect(component).toBeVisible();
        await expect(component.locator("bdo-alert")).not.toBeVisible();

        const navigation = component.locator("schema-navigation");
        await expect(navigation).toBeVisible();
        await expect(navigation.locator("bdo-button")).toHaveCount(0);
        await expect(navigation).toContainText("Ref Schema");
        await expect(component.locator("object-schema-viewer")).toContainText(["BillingAddress", "ShippingAddress", "Person"]);

        const buttons = component.locator("object-schema-viewer bdo-button");
        await expect(buttons).toHaveCount(3);

        await buttons.nth(0).click();
        await expect(navigation).toContainText("BillingAddress");
        await expect(navigation.locator("bdo-button")).toHaveCount(1);
        await expect(component.locator("object-schema-viewer")).toContainText("Street");
        await expect(component.locator("object-schema-viewer")).toContainText("City");
    });

    ["yaml", "json"].forEach(extension => {

        test(`renders array schema viewer with ${extension} extension`, async ({ mount }) => {
                const component = await mount(SchemaViewerComponent, {
                    props: {
                        src: `/array.schema.${extension}`
                    }
                });

            await expect(component).toBeVisible();
            await expect(component.locator("bdo-alert")).not.toBeVisible();
            await expect(component.locator("array-schema-viewer")).toBeVisible();
        });

        test(`renders object schema viewer with ${extension} extension`, async ({ mount }) => {
                const component = await mount(SchemaViewerComponent, {
                    props: {
                        src: `/object.schema.${extension}`
                    }
                });

            await expect(component).toBeVisible();
            await expect(component.locator("object-schema-viewer")).toBeVisible();
        });

        ["oneOf", "anyOf", "allOf"].forEach(combinator => {
            test(`renders ${combinator} schema viewer with ${extension} extension`, async ({ mount }) => {
                const component = await mount(SchemaViewerComponent, {
                    props: {
                        src: `/${combinator}.schema.${extension}`
                    }
                });

                await expect(component).toBeVisible();
                await expect(component.locator("bdo-alert")).not.toBeVisible();
                await expect(component.locator("x-of-schema-viewer")).toBeVisible();
            });
        });

        ["boolean", "integer", "number", "string"].forEach(primitive => {
            test(`renders ${primitive} schema viewer with ${extension} extension`, async ({ mount }) => {
                const component = await mount(SchemaViewerComponent, {
                    props: {
                        src: `/${primitive}.schema.${extension}`
                    }
                });

                await expect(component).toBeVisible();
                await expect(component.locator("bdo-alert")).not.toBeVisible();
                await expect(component.locator("primitive-schema-viewer")).toBeVisible();
            });
        });

        test(`handles $ref references with ${extension} extension`, async ({ mount }) => {
            const component = await mount(SchemaViewerComponent, {
                props: {
                    src: `/ref.schema.${extension}`
                }
            });

            await expect(component).toBeVisible();
            await expect(component.locator("bdo-alert")).not.toBeVisible();
            await expect(component.locator("ref-schema-viewer")).toHaveCount(3);
        });
    });

    test("shows error when schema is invalid", async ({ mount }) => {
        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "invalid.url"
            }
        });

        await expect(component.locator("bdo-alert")).toBeVisible();
    });
});