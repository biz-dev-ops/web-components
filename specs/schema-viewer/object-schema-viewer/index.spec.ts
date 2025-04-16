import { expect, test } from "@sand4rt/experimental-ct-web";
import { ObjectSchemaViewerComponent } from "../../../src/schema-viewer/components/object-schema-viewer/index";
import { StringContentRoute } from "../../helper/router-helper";

test.describe("ObjectSchemaViewer", () => {
    test("renders object schema viewer with properties", async ({ mount }) => {
        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        }
                    }
                },
                key: "user",
                src: "https://example.com/schema.json"
            }
        });

        await expect(component).toBeVisible();
        await expect(component.locator("[data-testid='object-title']")).toContainText("User");
        await expect(component.locator("[data-testid='property']")).toHaveCount(1);
    });

    test("shows required indicator when required", async ({ mount }) => {
        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        }
                    },
                    required: ["name"]
                },
                key: "user",
                required: true,
                src: "https://example.com/schema.json"
            }
        });

        await expect(component.locator("[data-testid='required-indicator']")).toBeVisible();
    });

    test("emits FragmentSelected event on property click", async ({ mount }) => {
        const events: any[] = [];
        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        }
                    }
                },
                key: "user",
                src: "https://example.com/schema.json"
            },
            on: {
                FragmentSelected: (event) => events.push(event)
            }
        });

        await component.locator("[data-testid='property']").first().click();
        expect(events).toHaveLength(1);
        expect(events[0].detail).toEqual([{
            name: "properties",
            key: "properties",
            hidden: true,
            disabled: true
        }, {
            name: "name",
            key: "name"
        }]);
    });

    test("renders nested properties", async ({ mount }) => {
        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema: {
                    type: "object",
                    properties: {
                        address: {
                            type: "object",
                            properties: {
                                street: {
                                    type: "string"
                                }
                            }
                        }
                    }
                },
                key: "user",
                src: "https://example.com/schema.json"
            }
        });

        await expect(component.locator("[data-testid='nested-object']")).toHaveCount(1);
    });
}); 