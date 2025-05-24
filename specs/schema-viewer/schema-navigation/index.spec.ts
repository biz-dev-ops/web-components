import { expect, test } from "@sand4rt/experimental-ct-web";
import { SchemaNavigation } from "../../../src/schema-viewer/components/schema-navigation/index";
import { FragmentIndexSelected } from "../../../src/schema-viewer/types";

test.describe("SchemaNavigation", () => {
    test("renders navigation path with visible fragments", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Address", key: "address" }
                ]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(2);
        await expect(component.getByTestId("schema-navigation-button").first()).toHaveText("User");
        await expect(component.getByTestId("schema-navigation-button").last()).toHaveText("Address");
    });

    test("hides fragments marked as hidden", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Properties", key: "properties", hidden: true },
                    { name: "Address", key: "address" }
                ]
            }
        });

        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(2);
        await expect(component.getByTestId("schema-navigation-button").first()).toHaveText("User");
        await expect(component.getByTestId("schema-navigation-button").last()).toHaveText("Address");
    });

    test("disables fragments marked as disabled", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Address", key: "address", disabled: true }
                ]
            }
        });

        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(2);
        await expect(component.getByTestId("schema-navigation-button").first()).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button").last()).toHaveAttribute("disabled");
    });

    test("emits FragmentIndexSelected event on button click", async ({ mount }) => {
        const events: any[] = [];
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "User", key: "user" },
                    { name: "Address", key: "address" },
                    { name: "Postal", key: "postal" }
                ]
            },
            on: {
                FragmentIndexSelected: (event: CustomEvent<FragmentIndexSelected>) => {
                    events.push(event);
                }
            }
        });

        const buttons = component.getByTestId("schema-navigation-button");
        await expect(buttons).toHaveCount(3);

        // Click first button
        await buttons.first().click();
        expect(events).toHaveLength(1);;
        expect(events[0].index).toBe(0);

        // Click second button
        await buttons.nth(1).click();
        expect(events).toHaveLength(2);
        expect(events[1].index).toBe(1);

        // Click second button
        await buttons.last().click();
        expect(events).toHaveLength(2);
    });

    test("handles empty fragments array", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: []
            }
        });

        await expect(component).not.toBeVisible();
    });

    test("handles single fragment", async ({ mount }) => {
        const component = await mount(SchemaNavigation, {
            props: {
                fragments: [
                    { name: "Root", key: "root", disabled: true }
                ]
            }
        });

        await expect(component).toBeVisible();
        await expect(component.getByTestId("schema-navigation-button")).toHaveCount(1);
        await expect(component.getByTestId("schema-navigation-button")).toHaveText("Root");
        await expect(component.getByTestId("schema-navigation-button")).toHaveAttribute("disabled");
    });
});