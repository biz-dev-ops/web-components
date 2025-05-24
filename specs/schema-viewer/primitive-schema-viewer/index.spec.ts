import { expect, test } from "@sand4rt/experimental-ct-web";
import { PrimitiveSchemaViewerComponent } from "../../../src/schema-viewer/components/primitive-schema-viewer/index";

test.describe("PrimitiveSchemaViewer", () => {
    test("renders string schema viewer with title and description", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                    description: "User's full name"
                }
            }
        };

        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "name"]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("primitive-title")).toContainText("Name");
        await expect(component.getByTestId("type-indicator")).toContainText("string");
        await expect(component.getByTestId("description")).toBeVisible();
        await expect(component.getByTestId("description")).toContainText("User's full name");
    });

    test("renders number schema viewer with format", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                age: {
                    type: "number",
                    title: "Age",
                    format: "integer"
                }
            }
        };

        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "age"]
            }
        });

        await expect(component.getByTestId("type-indicator")).toContainText("number: integer");
    });

    test("renders boolean schema viewer", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                active: {
                    type: "boolean",
                    title: "Active"
                }
            }
        };

        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "active"]
            }
        });

        await expect(component.getByTestId("type-indicator")).toContainText("boolean");
    });

    test("shows required indicator when required", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                name: {
                    type: "string",
                    title: "Name"
                }
            }
        };

        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "name"],
                required: true
            }
        });

        await expect(component.getByTestId("required-indicator")).toBeVisible();
    });

    test("shows additional properties", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                name: {
                    type: "string",
                    title: "Name",
                    minLength: 2,
                    maxLength: 100
                }
            }
        };

        const component = await mount(PrimitiveSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "name"]
            }
        });

        await expect(component.getByTestId("additional-property")).toContainText(["minLength", "maxLength"]);
    });
});