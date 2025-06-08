import { test, expect, MountResult } from "@sand4rt/experimental-ct-web";
import { SchemaViewerComponent } from "../../src/schema-viewer";
import { StringContentRoute, useRoutes } from "../helper/router-helper";

const PRIMITIVE_SCHEMA = `
type: string
title: Primitive Schema
description: A simple string schema
`;

const ARRAY_SCHEMA = `
type: array
title: Array Schema
items:
  type: string
  title: Array Item
`;

const OBJECT_SCHEMA = `
type: object
title: Object Schema
properties:
  name:
    type: string
    title: Name
  age:
    type: number
    title: Age
`;

const X_OF_SCHEMA = `
oneOf:
  - type: string
    title: String Option
  - type: number
    title: Number Option
`;

const QUERY_SCHEMA = `
type: object
title: Query Schema
properties:
  query:
    type: string
    title: Query
`;

const TASK_SCHEMA = `
type: object
title: Task Schema
properties:
  task:
    type: string
    title: Task
`;

const EVENT_SCHEMA = `
type: object
title: Event Schema
properties:
  event:
    type: string
    title: Event
`;

const COMMAND_SCHEMA = `
type: object
title: Command Schema
properties:
  command:
    type: string
    title: Command
`;

const NESTED_SCHEMA = `
type: object
title: Nested Schema
properties:
  name:
    type: string
    title: Name
  details:
    type: object
    title: Details
    properties:
      age:
        type: number
        title: Age
      address:
        type: object
        title: Address
        properties:
          street:
            type: string
            title: Street
          city:
            type: string
            title: City
`;

const SCHEMAS = ["primitive", "array", "object", "x-of"];

test.describe("SchemaViewer", () => {
    test.beforeEach(async ({ router }) => {
        await useRoutes(router, [
            new StringContentRoute("/primitive.schema.yaml", PRIMITIVE_SCHEMA),
            new StringContentRoute("/array.schema.yaml", ARRAY_SCHEMA),
            new StringContentRoute("/object.schema.yaml", OBJECT_SCHEMA),
            new StringContentRoute("/x-of.schema.yaml", X_OF_SCHEMA),
            new StringContentRoute("/nested.schema.yaml", NESTED_SCHEMA),
            new StringContentRoute("/query.schema.yaml", QUERY_SCHEMA),
            new StringContentRoute("/task.schema.yaml", TASK_SCHEMA),
            new StringContentRoute("/event.schema.yaml", EVENT_SCHEMA),
            new StringContentRoute("/command.schema.yaml", COMMAND_SCHEMA)
        ]);
    });

    SCHEMAS.forEach(schemaType => {
        test(`shows correct schema viewer components for ${schemaType} schema`, async ({ mount }) => {
            const component = await mount(SchemaViewerComponent, {
                props: {
                    src: `${schemaType}.schema.yaml`
                }
            });


            await expect(component.getByTestId(`${schemaType}-schema-viewer`)).toBeVisible();
            for (const otherSchemaType of SCHEMAS) {
                if (otherSchemaType !== schemaType) {
                    await expect(component.getByTestId(`${otherSchemaType}-schema-viewer`)).not.toBeVisible();
                }
            }
        });
    });

    ["query", "task", "event", "command"].forEach(useCaseType => {
        test(`shows correct badges for ${useCaseType} schema`, async ({ mount }) => {
            const component = await mount(SchemaViewerComponent, {
                props: {
                    src: `${useCaseType}.schema.yaml`
                }
            });

            await expect(component.getByTestId("schema-viewer-error")).not.toBeVisible();
            await expect(component.getByTestId("schema-viewer-use-case-type")).toBeVisible();
            await expect(component.getByTestId("schema-viewer-use-case-type")).toHaveAttribute("type", useCaseType);
        });
    });

    test("handles schema navigation changes", async ({ mount }) => {
        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "nested.schema.yaml"
            }
        });

        // Initial state
        await expect(component.getByTestId("object-schema-viewer")).toBeVisible();
        await expect(component.getByTestId("schema-navigation")).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(1);
        let button = component.getByTestId("schema-navigation-button").first();
        await expect(button).toHaveText("Nested Schema");
        await expect(button).toHaveAttribute("disabled");

        // Navigate to details object
        await component.getByTestId("object-schema-viewer-button").click();

        // Verify navigation to details object
        await expect(component.getByTestId("object-schema-viewer")).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(2);
        button = component.getByTestId("schema-navigation-button").first();
        await expect(button).toHaveText("Nested Schema");
        await expect(button).not.toHaveAttribute("disabled");
        await expect(component.getByTestId("schema-navigation-button").last()).toHaveText("Details");

        // Navigate to address object
        await component.getByTestId("object-schema-viewer-button").click();

        // Verify navigation to address object
        await expect(component.getByTestId("object-schema-viewer")).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(3);
        await expect(component.getByTestId("schema-navigation-button").last()).toHaveText("Address");

        // Navigate back to address object
        await component.getByTestId("schema-navigation-button").nth(2).click();

        // Verify back at address object
        await expect(component.getByTestId("object-schema-viewer")).toBeVisible();
        await expect(component.getByTestId("primitive-schema-viewer")).not.toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(3);

        // Navigate back to details object
        await component.getByTestId("schema-navigation-button").nth(1).click();

        // Verify back at details object
        await expect(component.getByTestId("object-schema-viewer")).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(2);

        // Navigate back to root
        await component.getByTestId("schema-navigation-button").first().click();

        // Verify back at root
        await expect(component.getByTestId("object-schema-viewer")).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(1);
        button = component.getByTestId("schema-navigation-button").first();
        await expect(button).toHaveText("Nested Schema");
        await expect(button).toHaveAttribute("disabled");
    });

    test("shows error for invalid schema", async ({ mount }) => {
        const component = await mount(SchemaViewerComponent, {
            props: {
                src: "invalid.schema.yaml"
            }
        });

        await expect(component.getByTestId("schema-viewer-error")).toBeVisible();
        await expect(component.getByTestId("schema-navigation")).not.toBeVisible();
    });

    test.afterEach(async ({ page }) => {
        await page.close();
    });
});