import { expect, test } from "@sand4rt/experimental-ct-web";
import { ArraySchemaViewerComponent } from "../../../src/schema-viewer/components/array-schema-viewer/index";

test.describe("ArraySchemaViewer", () => {
    test("renders array schema viewer with basic schema", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const component = await mount(ArraySchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "items"]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("array-title")).toContainText("Items");
        await expect(component.getByTestId("array-item-button")).toHaveCount(2);
    });

    test("shows required indicator when required", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            },
            required: ["items"]
        };

        const component = await mount(ArraySchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "items"],
                required: true
            }
        });

        await expect(component.getByTestId("required-indicator")).toBeVisible();
    });

    test("emits FragmentSelected event on item click", async ({ mount }) => {
        const events: any[] = [];
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const component = await mount(ArraySchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "items"]
            },
            on: {
                FragmentSelected: (event: any) => events.push(event)
            }
        });

        await component.getByTestId("array-item-button").first().click();
        expect(events).toHaveLength(1);
        expect(events[0]).toEqual([{
            name: "items",
            key: "items",
            disabled: true
        }, {
            name: "item",
            key: "items"
        }]);
    });

    test("disables second item button", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                items: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const component = await mount(ArraySchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "items"]
            }
        });

        await expect(component.getByTestId("array-item-button").nth(1)).toHaveAttribute("disabled");
    });
});