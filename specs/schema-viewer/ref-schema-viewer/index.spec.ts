import { expect, test } from "@sand4rt/experimental-ct-web";
import { RefSchemaViewerComponent } from "../../../src/schema-viewer/components/ref-schema-viewer/index";

test("renders ref schema viewer", async ({ mount }) => {
    const component = await mount(RefSchemaViewerComponent, {
        props: {
            schema: {
                $ref: "#/definitions/User"
            },
            key: "user",
            src: "https://example.com/schema.json"
        }
    });

    await expect(component).toBeVisible();
});

test("shows error when ref is invalid", async ({ mount }) => {
    const component = await mount(RefSchemaViewerComponent, {
        props: {
            schema: {
                $ref: "invalid-ref"
            },
            key: "user",
            src: "https://example.com/schema.json"
        }
    });

    await expect(component.locator("bdo-alert")).toBeVisible();
});

test("shows required indicator when required", async ({ mount }) => {
    const component = await mount(RefSchemaViewerComponent, {
        props: {
            schema: {
                $ref: "#/definitions/User"
            },
            key: "user",
            required: true,
            src: "https://example.com/schema.json"
        }
    });

    await expect(component.locator(".txt--required")).toBeVisible();
});

test("renders referenced schema", async ({ mount }) => {
    const component = await mount(RefSchemaViewerComponent, {
        props: {
            schema: {
                $ref: "#/definitions/User"
            },
            key: "user",
            src: "https://example.com/schema.json"
        }
    });

    // Wait for the referenced schema to load
    await expect(component.locator("object-schema-viewer, array-schema-viewer, primitive-schema-viewer")).toBeVisible();
}); 