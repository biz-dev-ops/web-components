import { expect, test } from "@sand4rt/experimental-ct-web";
import { ArraySchemaViewerComponent } from "../../../src/schema-viewer/components/array-schema-viewer/index";

test.describe("ArraySchemaViewer", () => {
    test("renders array schema viewer with basic schema", async ({ mount }) => {
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
        await expect(component.locator("[data-testid='array-title']")).toContainText("Items");
        await expect(component.locator("[data-testid='array-item']")).toHaveCount(2);
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

        await expect(component.locator("[data-testid='required-indicator']")).toBeVisible();
    });

    test("emits FragmentSelected event on item click", async ({ mount }) => {
        const events: any[] = [];
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
            },
            on: {
                FragmentSelected: (event) => events.push(event)
            }
        });

        await component.locator("[data-testid='array-item']").first().click();
        expect(events).toHaveLength(1);
        expect(events[0].detail).toEqual([{
            name: "items",
            key: "items",
            disabled: true
        }, {
            name: "item",
            key: "items"
        }]);
    });

    test("disables second item button", async ({ mount }) => {
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

        await expect(component.locator("[data-testid='array-item']").nth(1)).toBeDisabled();
    });
});