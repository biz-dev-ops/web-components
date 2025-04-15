import { expect, test } from "@sand4rt/experimental-ct-web";
import { ArraySchemaViewerComponent } from "../../../src/schema-viewer/components/array-schema-viewer/index";

test("renders array schema viewer", async ({ mount }) => {
    const component = await mount(ArraySchemaViewerComponent, {
        props: {
            schema: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            key: "items",
            src: "https://example.com/schema.json"
        }
    });

    await expect(component).toBeVisible();
    await expect(component.locator("h3")).toContainText("Items");
});

test("shows required indicator when required", async ({ mount }) => {
    const component = await mount(ArraySchemaViewerComponent, {
        props: {
            schema: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            key: "items",
            required: true,
            src: "https://example.com/schema.json"
        }
    });

    await expect(component.locator(".txt--required")).toBeVisible();
});

test("emits FragmentSelected event on click", async ({ mount }) => {
    const component = await mount(ArraySchemaViewerComponent, {
        props: {
            schema: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            key: "items",
            src: "https://example.com/schema.json"
        }
    });

    const [event] = await Promise.all([
        component.evaluate((node) => {
            return new Promise((resolve) => {
                node.addEventListener("FragmentSelected", (e) => resolve(e), { once: true });
            });
        }),
        component.locator("bdo-button").first().click()
    ]);

    expect(event).toBeDefined();
}); 