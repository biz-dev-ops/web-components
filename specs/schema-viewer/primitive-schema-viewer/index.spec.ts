import { expect, test } from "@sand4rt/experimental-ct-web";
import { PrimitiveSchemaViewerComponent } from "../../../src/schema-viewer/components/primitive-schema-viewer/index";

test("renders string schema viewer", async ({ mount }) => {
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
    await expect(component.locator("h3")).toContainText("Name");
    await expect(component.locator(".icon--type")).toContainText("string");
});

test("renders number schema viewer", async ({ mount }) => {
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

    await expect(component.locator(".icon--type")).toContainText("number: integer");
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

    await expect(component.locator(".icon--type")).toContainText("boolean");
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

    await expect(component.locator(".txt--required")).toBeVisible();
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

    await expect(component.locator("dt")).toContainText(["minLength", "maxLength"]);
}); 