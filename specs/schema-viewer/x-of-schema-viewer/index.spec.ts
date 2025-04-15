import { expect, test } from "@sand4rt/experimental-ct-web";
import { XOfSchemaViewerComponent } from "../../../src/schema-viewer/components/x-of-schema-viewer/index";

test("renders oneOf schema viewer", async ({ mount }) => {
    const component = await mount(XOfSchemaViewerComponent, {
        props: {
            schema: {
                oneOf: [
                    { type: "string" },
                    { type: "number" }
                ]
            },
            key: "value",
            src: "https://example.com/schema.json"
        }
    });

    await expect(component).toBeVisible();
    await expect(component.locator("h3")).toContainText("One Of");
});

test("renders anyOf schema viewer", async ({ mount }) => {
    const component = await mount(XOfSchemaViewerComponent, {
        props: {
            schema: {
                anyOf: [
                    { type: "string" },
                    { type: "number" }
                ]
            },
            key: "value",
            src: "https://example.com/schema.json"
        }
    });

    await expect(component.locator("h3")).toContainText("Any Of");
});

test("renders allOf schema viewer", async ({ mount }) => {
    const component = await mount(XOfSchemaViewerComponent, {
        props: {
            schema: {
                allOf: [
                    { type: "string" },
                    { type: "number" }
                ]
            },
            key: "value",
            src: "https://example.com/schema.json"
        }
    });

    await expect(component.locator("h3")).toContainText("All Of");
});

test("shows required indicator when required", async ({ mount }) => {
    const component = await mount(XOfSchemaViewerComponent, {
        props: {
            schema: {
                oneOf: [
                    { type: "string" },
                    { type: "number" }
                ]
            },
            key: "value",
            required: true,
            src: "https://example.com/schema.json"
        }
    });

    await expect(component.locator(".txt--required")).toBeVisible();
});

test("emits FragmentSelected event on click", async ({ mount }) => {
    const component = await mount(XOfSchemaViewerComponent, {
        props: {
            schema: {
                oneOf: [
                    { type: "string" },
                    { type: "number" }
                ]
            },
            key: "value",
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