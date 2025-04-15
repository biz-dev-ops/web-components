import { expect, test } from "@sand4rt/experimental-ct-web";
import { ObjectSchemaViewerComponent } from "../../../src/schema-viewer/components/object-schema-viewer/index";

test("renders object schema viewer", async ({ mount }) => {
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
    await expect(component.locator("h3")).toContainText("User");
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

    await expect(component.locator(".txt--required")).toBeVisible();
});

test("emits FragmentSelected event on click", async ({ mount }) => {
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

    await expect(component.locator("object-schema-viewer")).toHaveCount(2);
}); 