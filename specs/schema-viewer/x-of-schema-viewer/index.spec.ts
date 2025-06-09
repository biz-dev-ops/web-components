import { expect, test } from "@sand4rt/experimental-ct-web";
import { XOfSchemaViewerComponent } from "../../../src/schema-viewer/components/x-of-schema-viewer/index";

test.describe("XOfSchemaViewer", () => {
    test("renders oneOf schema viewer with multiple items", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                value: {
                    oneOf: [
                        { type: "string" },
                        { type: "number" }
                    ]
                }
            }
        };

        const component = await mount(XOfSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "value"]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("xof-item")).toHaveCount(2);
    });

    test("renders anyOf schema viewer with multiple items", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                value: {
                    anyOf: [
                        { type: "string" },
                        { type: "number" }
                    ]
                }
            }
        };

        const component = await mount(XOfSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "value"]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("xof-item")).toHaveCount(2);
    });

    test("renders allOf schema viewer with multiple items", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                value: {
                    allOf: [
                        { type: "string" },
                        { type: "number" }
                    ]
                }
            }
        };

        const component = await mount(XOfSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "value"]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("xof-item")).toHaveCount(2);
    });

    test("shows required indicator when required", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                value: {
                    oneOf: [
                        { type: "string" },
                        { type: "number" }
                    ]
                }
            },
            required: ["value"]
        };

        const component = await mount(XOfSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "value"],
                required: true,
                collapse: true
            }
        });

        await expect(component.getByTestId("xof-required-indicator")).toBeVisible();
    });

    test("emits FragmentSelected event on collapsed item click", async ({ mount }) => {
        const events: any[] = [];
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                value: {
                    oneOf: [
                        { type: "string" },
                        { type: "number" }
                    ]
                }
            }
        };

        const component = await mount(XOfSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "value"],
                collapse: true
            },
            on: {
                FragmentSelected: (event: any) => events.push(event)
            }
        });

        await component.getByTestId("xof-item").click();
        expect(events).toHaveLength(1);
        expect(events[0]).toEqual([{
            name: "value",
            key: "value"
        }]);
    });

    test("emits FragmentSelected event on item click with nested schema", async ({ mount }) => {
        const events: any[] = [];
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                value: {
                    oneOf: [
                        {
                            type: "object",
                            properties: {
                                name: { type: "string" }
                            }
                        },
                        { type: "number" }
                    ]
                }
            }
        };

        const component = await mount(XOfSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "value"]
            },
            on: {
                FragmentSelected: (event: any) => events.push(event)
            }
        });

        await component.getByTestId("xof-item").first().click();
        expect(events).toHaveLength(1);
        expect(events[0]).toEqual([
            { name: 'one of', key: 'oneOf', hidden: true },
            { name: '0', key: '0' }
        ]);
    });
});