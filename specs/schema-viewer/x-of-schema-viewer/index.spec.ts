import { expect, test } from "@sand4rt/experimental-ct-web";
import { XOfSchemaViewerComponent } from "../../../src/schema-viewer/components/x-of-schema-viewer/index";
import { StringContentRoute } from "../../helper/router-helper";

test.describe("XOfSchemaViewer", () => {
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
        await expect(component.locator("[data-testid='xof-title']")).toContainText("One Of");
        await expect(component.locator("[data-testid='xof-item']")).toHaveCount(2);
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

        await expect(component.locator("[data-testid='xof-title']")).toContainText("Any Of");
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

        await expect(component.locator("[data-testid='xof-title']")).toContainText("All Of");
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

        await expect(component.locator("[data-testid='required-indicator']")).toBeVisible();
    });

    test("emits FragmentSelected event on item click", async ({ mount }) => {
        const events: any[] = [];
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
            },
            on: {
                FragmentSelected: (event) => events.push(event)
            }
        });

        await component.locator("[data-testid='xof-item']").first().click();
        expect(events).toHaveLength(1);
        expect(events[0].detail).toEqual([{
            name: "one of",
            key: "oneOf",
            hidden: true
        }, {
            name: "string",
            key: "0"
        }]);
    });
}); 