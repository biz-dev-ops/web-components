import { expect, test } from "@sand4rt/experimental-ct-web";
import { PrimitiveSchemaViewerComponent } from "../../../src/schema-viewer/components/primitive-schema-viewer/index";

test.describe("PrimitiveSchemaViewer", () => {
    test("renders string schema viewer with title and description", async ({ mount }) => {
        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema: {
                    type: "string",
                    title: "Name",
                    description: "User's full name"
                },
                key: "name",
                src: "https://example.com/schema.json"
            }
        });

        await expect(component).toBeVisible();
        await expect(component.locator("[data-testid='primitive-title']")).toContainText("Name");
        await expect(component.locator("[data-testid='type-indicator']")).toContainText("string");
        await expect(component.locator("[data-testid='description']")).toBeVisible();
    });

    test("renders number schema viewer with format", async ({ mount }) => {
        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema: {
                    type: "number",
                    title: "Age",
                    format: "integer"
                },
                key: "age",
                src: "https://example.com/schema.json"
            }
        });

        await expect(component.locator("[data-testid='type-indicator']")).toContainText("number: integer");
    });

    test("renders boolean schema viewer", async ({ mount }) => {
        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema: {
                    type: "boolean",
                    title: "Active"
                },
                key: "active",
                src: "https://example.com/schema.json"
            }
        });

        await expect(component.locator("[data-testid='type-indicator']")).toContainText("boolean");
    });

    test("shows required indicator when required", async ({ mount }) => {
        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema: {
                    type: "string",
                    title: "Name"
                },
                key: "name",
                required: true,
                src: "https://example.com/schema.json"
            }
        });

        await expect(component.locator("[data-testid='required-indicator']")).toBeVisible();
    });

    test("shows additional properties", async ({ mount }) => {
        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema: {
                    type: "string",
                    title: "Name",
                    minLength: 2,
                    maxLength: 100
                },
                key: "name",
                src: "https://example.com/schema.json"
            }
        });

        await expect(component.locator("[data-testid='additional-property']")).toContainText(["minLength", "maxLength"]);
    });
}); 