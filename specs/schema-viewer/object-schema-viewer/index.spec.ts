import { expect, test } from "@sand4rt/experimental-ct-web";
import { ObjectSchemaViewerComponent } from "../../../src/schema-viewer/components/object-schema-viewer/index";

test.describe("ObjectSchemaViewer", () => {
    test("renders object schema viewer with multiple properties", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                user: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            title: "Name"
                        },
                        age: {
                            type: "number",
                            title: "Age"
                        },
                        email: {
                            type: "string",
                            title: "Email"
                        }
                    }
                }
            }
        };

        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "user"]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("object-schema-viewer-primitive-property")).toHaveCount(3);
    });

    test("shows required indicator when required", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                user: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            title: "Name"
                        }
                    },
                    required: ["name"]
                }
            },
            required: ["user"]
        };

        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "user"],
                collapse: true,
                required: true
            }
        });

        await expect(component.getByTestId("object-schema-viewer-required-indicator")).toBeVisible();
    });

    test("emits FragmentSelected event on property click when collapsed", async ({ mount }) => {
        const events: any[] = [];
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                user: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string",
                            title: "Name"
                        }
                    }
                }
            }
        };

        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "user"],
                collapse: true
            },
            on: {
                FragmentSelected: (event: any) => events.push(event)
            }
        });

        await component.getByTestId("object-schema-viewer-button").click();
        expect(events).toHaveLength(1);
        expect(events[0]).toEqual([{
            name: "user",
            key: "user"
        }]);
    });

    test("renders property with description", async ({ mount }) => {
        const schema = {
            $id: "https://example.com/schema.json",
            type: "object",
            properties: {
                user: {
                    type: "object",
                    description: "User object",
                    properties: {
                        name: {
                            type: "string",
                            title: "Name"
                        }
                    }
                }
            }
        };

        const component = await mount(ObjectSchemaViewerComponent, {
            props: {
                schema,
                references: {},
                path: ["properties", "user"]
            }
        });

        await expect(component.getByTestId("object-schema-viewer-description")).toBeVisible();
        await expect(component.getByTestId("object-schema-viewer-description")).toContainText("User object");
    });
});