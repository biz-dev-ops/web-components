import { expect, test } from "@sand4rt/experimental-ct-web";
import { RefSchemaViewerComponent } from "../../../src/schema-viewer/components/ref-schema-viewer/index";
import { StringContentRoute, useRoutes } from "../../helper/router-helper";

test.describe("RefSchemaViewer", () => {
    test("renders ref schema viewer with valid ref", async ({ mount }) => {
        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    definitions: {
                        User: {
                            type: "object",
                            properties: {
                                name: { type: "string" }
                            }
                        }
                    },
                    $ref: "#/definitions/User"
                },
                key: "user",
                src: "https://example.com/schema.yaml"
            }
        });

        await expect(component.locator("[data-testid='error']")).not.toBeVisible();
        await expect(component.locator("[data-testid='ref-content']")).toBeVisible();
    });

    test("shows error when ref is invalid", async ({ mount }) => {
        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    $ref: "invalid-ref"
                },
                key: "user",
                src: "https://example.com/schema.yaml"
            }
        });

        await expect(component.locator("[data-testid='error']")).toBeVisible();
    });

    test("shows required indicator when required", async ({ mount }) => {
        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    $ref: "#/definitions/User"
                },
                key: "user",
                required: true,
                src: "https://example.com/schema.yaml"
            }
        });

        await expect(component.locator("[data-testid='required-indicator']")).toBeVisible();
    });

    test("renders referenced schema", async ({ mount }) => {
        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    $ref: "#/definitions/User"
                },
                key: "user",
                src: "https://example.com/schema.yaml"
            }
        });

        await expect(component.locator("[data-testid='ref-content']")).toBeVisible();
    });

    test("emits FragmentSelected event on ref content click", async ({ mount }) => {
        const events: any[] = [];
        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    $ref: "#/definitions/User"
                },
                key: "user",
                src: "https://example.com/schema.yaml"
            },
            on: {
                FragmentSelected: (event) => events.push(event)
            }
        });

        await expect(component.locator("[data-testid='error']")).not.toBeVisible();
        await component.locator("[data-testid='ref-content']").first().click();
        expect(events).toHaveLength(1);
    });

    test("resolves external reference with absolute path", async ({ mount, router }) => {
        await useRoutes(router, new StringContentRoute(
            "https://example.com/user.yaml", `
type: object
properties:
  name:
    type: string
`));

        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    $ref: "https://example.com/user.yaml"
                },
                key: "user",
                src: "https://example.com/schema.yaml"
            }
        });

        await expect(component.locator("[data-testid='error']")).not.toBeVisible();
        await expect(component.locator("[data-testid='ref-content']")).toBeVisible();
        await expect(component.locator("[data-testid='property']")).toContainText("Name");
    });

    test("resolves external reference with relative path", async ({ mount, router }) => {
        await useRoutes(router, new StringContentRoute(
            "https://example.com/definitions/user.yaml", `
type: object
properties:
  name:
    type: string
`));

        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    $ref: "./definitions/user.yaml"
                },
                key: "user",
                src: "https://example.com/schema.yaml"
            }
        });

        await expect(component.locator("[data-testid='error']")).not.toBeVisible();
        await expect(component.locator("[data-testid='ref-content']")).toBeVisible();
        await expect(component.locator("[data-testid='property']")).toContainText("Name");
    });

    test("resolves nested external references", async ({ mount, router }) => {
        await useRoutes(router, [
            new StringContentRoute("https://example.com/definitions/address.yaml", `
type: object
properties:
  street:
    type: string
`),
            new StringContentRoute("https://example.com/definitions/user.yaml", `
type: object
properties:
  address:
    $ref: "./address.yaml"
`)]);

        const component = await mount(RefSchemaViewerComponent, {
            props: {
                schema: {
                    $ref: "./definitions/user.yaml"
                },
                key: "user",
                src: "https://example.com/schema.yaml"
            }
        });

        await expect(component.locator("[data-testid='error']")).not.toBeVisible();
        await expect(component.locator("[data-testid='ref-content']")).toBeVisible();
        await expect(component.locator("[data-testid='nested-object']")).toBeVisible();
        await expect(component.locator("[data-testid='property']")).toContainText("street");
    });
});